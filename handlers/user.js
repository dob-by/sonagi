const models = require('../models')

exports.newUser = async (req, res, next) => {
    const { email, code, nickname, password } = req.body;
    
    // 코드 검사

    const user = await models.user.create({
        email,
        nickname,
        password
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
        success: true
    });
}