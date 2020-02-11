const { Schema, model } = require('mongoose');
const User = require('./Users');
const Article = require('./Article');

const commentSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: Article
    }



}, { timestamps: true });


const Comment = model.Schema('Comment', commentSchema);
module.exports = Comment;