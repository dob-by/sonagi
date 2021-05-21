var express = require('express');
var router = express.Router();
var userCliHandlers = require('../../handlers/user_cli')

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("user get called")
  res.send('respond with a resource');
});

router.post('/', userCliHandlers.newUser);

router.post('/login', userCliHandlers.login);

module.exports = router;
