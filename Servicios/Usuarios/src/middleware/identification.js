const jwt = require('jsonwebtoken');
const config = require('../config');

exports.identification = (req, res, next) => {
    let token;
    if (req.headers.client === 'not-browser'){
        token = req.headers.authorization;
    }else{
        token = req.cookies['Authorization']
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Access denied'
        });
    }

    try {
        const userToken = token.split(' ')[1];
        //console.log(userToken);
        const jwtverified = jwt.verify(userToken, config.jwtSecret);
        //console.log(jwtverified);
        if (jwtverified){
            req.user = jwtverified;
            next();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: 'Server error',
            log: error
        });
    }

}