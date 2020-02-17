const Movie = require('../models/movie.model');

exports.addNewMovie = (req, res) =>
{
    res.render('newMovieForm');
}

exports.createNewMovie = async (req, res, next) =>
{

    try {
        const data = req.body;
        await Movie.create(data);
        res.redirect('/movies');
    } catch (err) {
        next(err);
    }

}

exports.listAllMovies = async (req, res, next) =>
{
    try {
        console.log("inside list of all movies");
        const movies = await Movie.find();
        res.render('movieList', { movies });

    } catch (err) {
        next(err);
    }

}

exports.movieDetail = async (req, res, next) =>
{
    console.log("inside movieDetail")
    try {
        const id = req.params.id;
        const movie = await Movie.findById(id).populate('comments');
        res.render('movieDetails', { movie });

    } catch (err) {
        next(err);
    }
}

exports.updateMovieForm = async (req, res, next) =>
{
    try {

        const id = req.params.id;
        const movie = await Movie.findById(id);
        res.render('updateMovieForm', { movie });

    } catch (err) {
        next(err);
    }
}

exports.updateMovie = async (req, res, next) =>
{
    try {
        const id = req.params.id;
        const data = req.body;
        await Movie.findByIdAndUpdate(id, data)
        res.redirect('/movies');

    } catch (err) {
        next(err);
    }
}

exports.deleteMovie = async (req, res, next) =>
{
    try {
        const id = req.params.id;
        await Movie.findByIdAndDelete(id)
        res.redirect('/movies');


    } catch (err) {
        next(err);
    }
}