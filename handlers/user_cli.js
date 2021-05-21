const models = require('../models')
const jwt = require('../middlewares/jwt')

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await models.user_cli.findOne({
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
    const jwtToken = await jwt.sign(user);
    return res.json({
        success: true,
        token: jwtToken.token,
        nickname: user.nickname
    })
}

exports.newUser = async (req, res, next) => {
    const { email, nokemail, code, nickname, password } = req.body; //nok: 보호자 이메일
    
    // 코드 검사
    const auth = await models.email.findOne({
        email,
        code
    });
    
    if (!auth) {
        console.log('wrong code')
        return res.json({
            success: false
        });
    }
    const check = await models.user_cli.findOne({
        email
    });
    if (check) {
        console.log('duplicated email')
        return res.json({
            success: false
        });
    }

    const nok = await models.user.findOne({
        email: nokemail
    });
    if (!nok) {
        console.log('invalid nok email')
        return res.json({
            success: false
        });
    }

    const user = await models.user_cli.create({
        email,
        nickname,
        password,
        user: nok._id
    });

    await models.user_cli.updateOne({
        _id: user._id
    }, {
        $set: {
            password: user.generateHash(password)
        }
    });

    nok.addUserCli(user._id)
    
    console.log("here")
    console.log(user.email, nok.email)
    res.json({
        success: true,
        nickname
    });
}