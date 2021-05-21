const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_FACTOR = 10;

const userSchema = mongoose.Schema({
    email: String,
    nickname: String,
    password: String,
    fcm_token: String,
    user_cli: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserCli' }]
});

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR), null);
};

userSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.addUserCli = function(user_cli_id){
    this.user_cli.push(user_cli_id)
    return this.save()
};

const User = mongoose.model('User', userSchema);
module.exports = User;