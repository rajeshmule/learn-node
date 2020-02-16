const express = require('express');
const router = express.Router();

const controller = require('../controllers/comment.controller');


/* GET users listing. */
router
    .route('/')
    .post(controller.newComment)
// .get(controller.listAllMovies)

// router
//     .route('/:id')
//     .get(controller.movieDetail)

// router
//     .route('/update/:id')
//     .get(controller.updateMovieForm)
//     .post(controller.updateMovie)

// router
//     .route('/delete/:id')
//     .get(controller.deleteMovie)

module.exports = router;