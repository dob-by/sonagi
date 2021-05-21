var express = require('express');
var router = express.Router();
var logHandlers = require('../../handlers/log')
var auth = require('../../middlewares/auth').checkToken


router.get('/', auth, logHandlers.getLog)

router.post('/', auth, logHandlers.newLog);

router.post('/alarm', logHandlers.alarm);

module.exports = router;
