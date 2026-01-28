const { signupSchema, signinSchema, verifySchema, resetPasswordSchema,resetPasswordRequestSchema, acceptResetPasswordRequestSchema } = require('../middleware/validator'); 
const { doHash, doCompare, hmacProcess } = require('../utils/hashing');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');
const transport = require('../middleware/sendMail');
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const { error } = signupSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                error: 'User already exists'
            });
        }
        const hashedPassword = await doHash(password, 12);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({
            message: 'User created successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
}

//login controller
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const {error} = signinSchema.validate({email,password});
        const user = await User.findOne({ email }).select('+password');
        if (error) {
            return res.status(401).json({
                error: error.details[0].message
            });
        }
        if (!user) {
            return res.status(400).json({
                error: 'Invalid email or password'
            });
        }
        const isMatch = await doCompare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                error: 'Invalid email or password'
            });
        }
        //ONLY DEBUGGING
        //console.log('user:', user);
        //console.log(config.jwtSecret);

        const token = jwt.sign({ 
            userId: user._id,
            email: user.email,
            verified: user.verified,
         }, config.jwtSecret, { expiresIn: '30m' });
        res.cookie('Authorization', 'Bearer ' + token, {expires: new Date(Date.now() + 3600000), httpOnly: process.env.NODE_ENV === 'production', secure: process.env.NODE_ENV === 'production'}).json({
            success: true,
            token: token,
            message: 'User logged in successfully'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
}

exports.signout = async (req, res) => {
    res.clearCookie('Authorization')
    .status(200)
    .json({
        message: 'User logged out successfully'
    });
}

exports.sendVerificationEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: 'Invalid email or password'
            });
        }
        if (user.verified) {
            return res.status(400).json({
                error: 'User already verified'
            });
        }
        const codeValue = Math.floor(100000 + Math.random() * 900000).toString();

        let info = await transport.sendMail({
            from: config.sendingEmailAddress,
            to: user.email,
            subject: 'Account verification',
            html: `<p>Hi ${user.name},</p><p>Your verification code is <b>${codeValue}</b></p>`
        });

        if (info.accepted[0] === user.email) {
            const hashedCodeValue = hmacProcess(codeValue, config.hmacVerificationCodeSecret);
            user.verificationToken = hashedCodeValue;
            user.verificationTokenValidation = Date.now();
            await user.save();
            res.status(200).json({
                message: 'Verification code sent successfully'
            });
        } else {
            res.status(400).json({
                error: 'Failed to send verification code'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error',
            log: error
        });
    }
}


exports.verifyVerificationCode = async (req, res) => {
    try {
        const { email, code } = req.body;
        const existingUser = await User.findOne({ email }).select('+verificationToken +verificationTokenValidation');

        if (!existingUser) {
            return res.status(400).json({
                success: false,
                error: 'User not found'
            });
        }
        if (existingUser.verified) {
            return res.status(400).json({
                success: false,
                error: 'User already verified'
            });
        }
        console.log(existingUser.verificationToken);
        console.log(config.hmacVerificationCodeSecret);
        const hashedCodeValue = hmacProcess(code, config.hmacVerificationCodeSecret);
        console.log(hashedCodeValue);
        if (hashedCodeValue !== existingUser.verificationToken) {
            return res.status(400).json({
                success: false,
                error: 'Invalid verification code'
            });
        } else {
            existingUser.verified = true;
            existingUser.verificationToken = null;
            existingUser.verificationTokenValidation = null;
            await existingUser.save();
            return res.status(200).json({
                success: true,
                message: 'User verified successfully'
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal server error',
            log: error
        });
    }

};

exports.resetPassword = async (req, res) => {
    const userId = req.user.userId;
    const verified = req.user.verified;
    //console.log(userId);
    const {oldPassword, newPassword} = req.body;
    try {
        const {error} = resetPasswordSchema.validate({oldPassword, newPassword});
        if (error) {
            return res.status(401).json({
                success: false,
                error: error.details[0].message
            });
        }
        if (!verified) {
            return res.status(401).json({
                success: false,
                error: 'User not verified'
            });
        }

        const existingUser = await User.findOne({ _id: userId }).select('+password');

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        //console.log(existingUser.name);
        //console.log(oldPassword);
        //console.log(existingUser.password);
        const result = await doCompare(oldPassword, existingUser.password);
        if (!result) {
            return res.status(401).json({
                success: false,
                error: 'Invalid password'
            });
        }

        const hashedPassword = await doHash(newPassword, 12);
        existingUser.password = hashedPassword;
        await existingUser.save();
        return res.status(200).json({
            success: true,
            message: 'password updated successfully'
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

exports.changePasswordEmail = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { error } = resetPasswordRequestSchema.validate({ email, password });
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: 'Invalid email or password'
            });
        }
        const codeValue = Math.floor(100000 + Math.random() * 900000).toString();

        let info = await transport.sendMail({
            from: config.sendingEmailAddress,
            to: user.email,
            subject: 'Forgot password verification',
            html: `<p>Hi ${user.name},</p><p>Your verification code is <b>${codeValue}</b></p>`
        });

        if (info.accepted[0] === user.email) {
            const hashedCodeValue = hmacProcess(codeValue, config.hmacVerificationCodeSecret);
            user.resetPasswordToken = hashedCodeValue;
            user.resetPasswordTokenValidation = Date.now();
            await user.save();
            res.status(200).json({
                message: 'Password reset code sent successfully'
            });
        } else {
            res.status(400).json({
                error: 'Failed to send reset password code'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error',
            log: error
        });
    }
}


exports.verifyPasswordEmailCode = async (req, res) => {
    try {
        const { email, code, newPassword } = req.body;
        const { error } = acceptResetPasswordRequestSchema.validate({email, code}); //!!!
        if (error) {
            return res.status(401).json({
                success: false,
                error: error.details[0].message
            });
        }
        const existingUser = await User.findOne({ email }).select('+resetPasswordToken +resetPasswordTokenValidation');

        if (!existingUser) {
            return res.status(400).json({
                success: false,
                error: 'User not found'
            });
        }

        console.log(existingUser.resetPasswordToken);
        console.log(config.hmacVerificationCodeSecret);
        const hashedCodeValue = hmacProcess(code, config.hmacVerificationCodeSecret);
        console.log(hashedCodeValue);
        if (hashedCodeValue !== existingUser.resetPasswordToken) {
            return res.status(400).json({
                success: false,
                error: 'Invalid reset password code'
            });
        } else {
            existingUser.verified = true;
            existingUser.verificationToken = null;
            existingUser.verificationTokenValidation = null;
            await existingUser.save();
            return res.status(200).json({
                success: true,
                message: 'User password reset successfully'
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal server error',
            log: error
        });
    }

};