const models = require('../models')

exports.checkEmail = async (req, res, next) => {
    const email = req.body.email;

    //중복체크
    const existingUser = await models.user.findOne({
        email
    });
    if (existingUser)
        res.json({
            success: false,
            message: 'duplicated email'
        });
    //이메일 보내기, 코드랑 이메일 email model에 저장
    res.json({
        success: true
    });
}