const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    commentBody: {
        type: String,
        required: true
    },
    movieId: {
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    }
}, { timestamps: true });

const Comment = model('Comment', commentSchema);
module.exports = Comment;