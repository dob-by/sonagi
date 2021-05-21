const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_FACTOR = 10;

const userCliSchema = mongoose.Schema({
    email: String,
    nickname: String,
    password: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    log: [{type: mongoose.Schema.Types.ObjectId, ref: 'Log'}]
});

userCliSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR), null);
};

userCliSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

userCliSchema.methods.addLog = function(log_id){
    this.log.push(log_id);
    return this.save();
};

const UserCli = mongoose.model('UserCli', userCliSchema);
module.exports = UserCli;