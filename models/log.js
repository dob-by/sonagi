const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    gradient: { type: Number },
    user_cli: { type: mongoose.Schema.Types.ObjectId, ref: 'UserCli' }, // 어떤 사용자의 기울기인지
    created_at: { type: Date, default: Date.now } 
});

const Log = mongoose.model('Log', logSchema);
module.exports = Log;