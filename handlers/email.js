const models = require('../models')
const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendEmail(email, res) {
    const code = Math.random().toString(36).slice(2);
    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        host: 'smtp.gmail.com',
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: "소나기",
        to: email,
        subject: "[소나기] 인증 메일입니다",
        text: "인증 코드: " + code
    };
    await smtpTransport.sendMail(mailOptions, async (error, responses) => {
        if (error) {
            res.json({
                success: false
            });
        }
        else {
            const auth = await models.email.create({
                email,
                code
            });
            if (!auth) {
                res.json({
                    success: false
                });
            }
            res.json({
                success: true
            });
        }
    })
}

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
    await sendEmail(email, res);
}