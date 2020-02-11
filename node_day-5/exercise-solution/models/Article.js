const { Schema, model } = require('mongoose');
const User = require('./Users');

const articlesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    disciption: {
        type: String,
        required: true
    },
    body: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: User
    }
}, { timestamps: true });

const Article = model('Article', articlesSchema);

module.exports = Article;

