const Movie = require('../models/movie.model');

exports.addNewMovie = (req, res) =>
{
    res.render('newMovieForm');
}

exports.createNewMovie = (req, res, next) =>
{
    const data = req.body;
    Movie.create(data, (err, createdMovies) =>
    {
        if (err) return next(err);
        res.redirect('/movies');
    });
}

exports.listAllMovies = (req, res, next) =>
{
    Movie.find((err, movies) =>
    {
        if (err) next(err);
        res.render('movieList', { movies });
    });
}

exports.movieDetail = (req, res, next) =>
{
    const id = req.params.id
    Movie.findById(id, (err, movie) =>
    {
        if (err) next(err);
        res.render('movieDetails', { movie });
    })
}

exports.updateMovieForm = (req, res, next) =>
{
    const id = req.params.id;
    Movie.findById(id, (err, movie) =>
    {
        if (err) return next(err);
        res.render('updateMovieForm', { movie });
    });
}

exports.updateMovie = (req, res, next) =>
{
    const id = req.params.id;
    const data = req.body;
    console.log(data);
    Movie.findByIdAndUpdate(id, data, (err, movie) =>
    {
        if (err) return next(err);
        res.redirect('/movies');
    });
}

exports.deleteMovie = (req, res, next) =>
{
    const id = req.params.id;
    Movie.findByIdAndDelete(id, (err, deleteMovie) =>
    {
        if (err) return next(err);
        res.redirect('/movies');
    })
}