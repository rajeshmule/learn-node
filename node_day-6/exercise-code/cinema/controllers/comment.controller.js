const Comment = require('../models/comment.model');
const Movie = require('../models/movie.model');

exports.newComment = async (req, res, next) =>
{
    console.log("inside new comment")
    try {
        const data = req.body;
        const id = req.body.movieId;
        let comment = await Comment.create(data);
        let movie = await Movie.findByIdAndUpdate(id, { $push: { comments: comment.id } }, { new: true })
            .populate('comments');
        // res.render('movieDetails', { movie });
        res.redirect(`/movies/${id}`);

    } catch (error) {
        res.send(error);
    }
}