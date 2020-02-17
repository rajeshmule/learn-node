const Comment = require('../models/comment.model');
const Movie = require('../models/movie.model');

exports.newComment = async (req, res, next) =>
{

    try {
        const data = req.body;
        console.log(data);
        const id = req.body.movieId;
        let comment = await Comment.create(data);
        let movie = await Movie.findByIdAndUpdate(id, { $push: { comments: comment.id } }, { new: true })
            .populate('comments');
        res.redirect(`/movies/${id}`);

    } catch (error) {
        res.send(error);
    }
}