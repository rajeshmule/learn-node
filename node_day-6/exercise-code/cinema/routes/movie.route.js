const express = require('express');
const router = express.Router();

const controller = require('../controllers/movie.controller');


/* GET users listing. */
router
    .route('/new')
    .get(controller.addNewMovie)

router
    .route('/')
    .post(controller.createNewMovie)
    .get(controller.listAllMovies)

router
    .route('/:id')
    .get(controller.movieDetail)

router
    .route('/update/:id')
    .get(controller.updateMovieForm)
    .post(controller.updateMovie)

router
    .route('/delete/:id')
    .get(controller.deleteMovie)

module.exports = router;
