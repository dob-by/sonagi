const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_FACTOR = 10;

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    user_cli: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserCli' }]
});

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR), null);
};

userSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;