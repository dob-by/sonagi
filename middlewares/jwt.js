const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRETKEY;
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const options = {
    algorithm: "HS256",
    expiresIn: "30m",
    issuer: "sonagi"
}

module.exports = {
    sign: async (user) => {
        const payload = {
            id: user._id
        };
        const result = {
            token: jwt.sign(payload, secretKey, options),
            refreshToken: randToken.uid(256)
        };
        return result
    },
    verify: async (token) => {
        let decoded;
        try {
            decoded = jwt.verify(token, secretKey);
        } catch (err) {
            return -1;
        }
        return decoded;
    }
}