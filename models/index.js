const models = {};

models.user = require('./user')
models.user_cli = require('./user_cli')
models.email = require('./email')
models.post = require('./post')
models.log = require('./log')

module.exports = models;