const jwt = require('./jwt');

const auth = {
    checkToken: async (req, res, next) => {
        var token = req.headers.token;
        // 토큰 없음
        if (!token) {
            console.log("토큰 없음")
            return res.json({success: false, message: "no token"});
        }
        // decode
        const user = await jwt.verify(token);
        if (user == -1 || !user._id) {
            return res.json({success: false, message: "invalid token"});
        }
        req.uid = user._id;
        next();
    }
}

module.exports = auth;