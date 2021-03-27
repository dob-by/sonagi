const models = require('../models')


exports.newUser = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await models.user.create({
        email,
        password
    })
    await models.user.updateOne({
        _id: user._id
    }, {
        $set: {
            password: user.generateHash(password)
        }
    });
    //이메일 중복체크 구현하기
    res.json({
        success: true,
        email: email,
        password: password
    });
}