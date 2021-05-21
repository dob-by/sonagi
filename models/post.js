const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    content: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // 참조
    created_at: { type: Date, default: Date.now }
});

const postSchema = mongoose.Schema({
    title: String,
    content: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // 참조
    comment: [ commentSchema ],
    created_at: { type: Date, default: Date.now }
});

const Post = mongoose.model( 'Post', postSchema);
module.exports = Post;