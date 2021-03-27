var express = require('express');
var router = express.Router();
var userRouter = require('./api/user');
/*var postRouter = require('./api/post');
var userCliRouter = require('./api/user_cli');
var logRouter = require('./api/log');*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/user', userRouter);
/*router.use('/post', postRouter);
router.use('/user_cli', userCliRouter);
router.use('/log', logRouter);*/

module.exports = router;
