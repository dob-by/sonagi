var express = require('express');
var router = express.Router();
var userRouter = require('./api/user');
var emailRouter = require('./api/email');
var userCliRouter = require('./api/user_cli');
var logRouter = require('./api/log');
/*var postRouter = require('./api/post');
var userCliRouter = require('./api/user_cli');
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/user', userRouter);
router.use('/email', emailRouter);
router.use('/usercli', userCliRouter);
router.use('/log', logRouter);
/*router.use('/post', postRouter);*/

module.exports = router;
