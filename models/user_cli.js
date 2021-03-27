const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userCliSchema = mongoose.Schema({
    email: String,
    password: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

userCliSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR), null);
};

userCliSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

const UserCli = mongoose.model('UserCli', userSchema);
module.exports = UserCli;