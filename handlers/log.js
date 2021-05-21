const models = require('../models')
const jwt = require('../middlewares/jwt');
const admin = require('firebase-admin');
const { user_cli } = require('../models');
const { use } = require('../routes');

exports.alarm = async (req, res, next) => {
    //피보호자 낙상시 피보호자 폰에서 요청. 보호자 폰으로 알람 가게
    //피보호자의 uid로 보호자의 fcm_token 알아내기
    const { uid } = req.body;
    models.user_cli.findOne({_id: uid}).populate({
        path: 'user',
        select: 'fcm_token'
    }).exec((err, data) => {
        if (err) console.log(err);
        fcm_token = data.user.fcm_token;
        if (!fcm_token) return res.json({success: false});
        let message = {
            data: {
                title: data.nickname + ' 낙상 알림',
                body: data.nickname + '님의 낙상이 감지되었습니다.'
            },
            token: fcm_token
        };
        admin.messaging().send(message).then(function (response) {
            return res.json({success: true});
        }).catch(function (err) {
            return res.json({success: false});
        });
    });
}

exports.getLog = async (req, res, next) => {
    //uid > 이사람의 보호자 기울기 정보를 최근 1주일 보내기
    models.user.findOne({_id: req.uid}).populate({
        path: 'user_cli',
        populate: { path: 'log', select: 'gradient created_at' },
        select: 'log nickname'
    }).exec((err, data) => {
        return res.json({success: true, data: data.user_cli});
    });
    return res.json({success: false});
}

exports.newLog = async (req, res, next) => {
    console.log("인증 완료")
    const { gradient } = req.body; //기울기
    const user = await models.user_cli.findOne({
        _id: req.uid
    })
    if (!user) res.json({success: false});

    const log = await models.log.create({
        gradient: parseInt(gradient),
        user_cli: req.uid
    });
    if (!log) return res.json({success: false});

    user.addLog(log._id);
    return res.json({success: true});
}