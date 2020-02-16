const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    commentBody: {
        type: String,
        required: true
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    }
    // movieId: {
    //     type: String
    // }
}, { timestamps: true });

const Comment = model('Comment', commentSchema);
module.exports = Comment;