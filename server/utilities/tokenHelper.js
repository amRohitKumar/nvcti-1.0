const jwt = require('jsonwebtoken');
const User = require('../models/user');


const createAuthTokens = async ({ user, secret, secret2 }) => {
    const token = jwt.sign(user, secret, { expiresIn: '10m', },);
    const refreshToken = jwt.sign(user, secret2, { expiresIn: '1y' },);
    return Promise.all([token, refreshToken]);
}

module.exports.createAuthTokens = createAuthTokens;
