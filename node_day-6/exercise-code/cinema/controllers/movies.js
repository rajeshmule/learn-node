const Users = require('../models/movies');

exports.addNewMovie = (req, res) =>
{
    res.render('newMovieForm');
}