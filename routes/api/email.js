var express = require('express');
var router = express.Router();
var emailHandlers = require('../../handlers/email')

router.post('/', emailHandlers.checkEmail);

module.exports = router;
