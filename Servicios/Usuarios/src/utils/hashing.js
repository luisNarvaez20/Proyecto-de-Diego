
const bcrypt = require('bcryptjs');
const { create } = require('../models/User');
const { createHmac } = require('crypto');
exports.doHash = async (password,saltNum) => {
    const salt = await bcrypt.genSalt(saltNum);
    return await bcrypt.hash(password, salt);
}

exports.doCompare = async (password,hash) => {
    return await bcrypt.compare(password, hash);
}

exports.hmacProcess = (value,key) => {
    const result = createHmac('sha256', key).update(value).digest('hex');
    return result;
}