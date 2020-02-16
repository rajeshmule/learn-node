const Comment = require('../models/comment.model');
const Movie = require('../models/movie.model');

exports.newComment = (req, res, next) =>
{
    const data = req.body;
    const id = req.body.movieId;
    Comment.create(data, (err, comment) =>
    {
        console.log(id, data);
        if (err) return next(err);
        Movie.findByIdAndUpdate(id, { $push: { comments: data } }, (err, movie) =>
        {
            console.log(id);
            // res.redirect(`/movie/ + $(id)`);
            res.render('movieDetails', { movie });
        });

    });

}