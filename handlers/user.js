const models = require('../models')
const jwt = require('../middlewares/jwt')

exports.login = async (req, res, next) => {
    const { email, password, fcm_token } = req.body;
    const user = await models.user.findOne({
        email
    });
    if (!user) {
        //유저가 존재하는지
        return res.json({
            success: false
        });
    }
    if (!user.validatePassword(password)) {
        //패스워드 확인
        return res.json({
            success: false
        });
    }
    if (user.fcm_token != fcm_token) {
        await models.user.updateOne({
            _id: user._id
        }, {
            $set: {
                fcm_token
            }
        });
    }
    
    const jwtToken = await jwt.sign(user);
    return res.json({
        success: true,
        token: jwtToken.token,
        nickname: user.nickname
    });
}

exports.newUser = async (req, res, next) => {
    const { email, code, nickname, password, fcm_token } = req.body;
    
    // 코드 검사
    const auth = await models.email.findOne({
        email,
        code
    });
    
    if (!auth) {
        return res.json({
            success: false
        });
    }
    const check = await models.user.findOne({
        email
    });
    if (check) {
        return res.json({
            success: false
        });
    }

    const user = await models.user.create({
        email,
        nickname,
        password,
        fcm_token
    });

    await models.user.updateOne({
        _id: user._id
    }, {
        $set: {
            password: user.generateHash(password)
        }
    });
    
    //email 모델에서 delete하기
    res.json({
        success: true,
        nickname
    });
}