var express = require('express');
var router = express.Router();
var userHandlers = require('../../handlers/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("user get called")
  res.send('respond with a resource');
});

router.post('/', userHandlers.newUser);

module.exports = router;
