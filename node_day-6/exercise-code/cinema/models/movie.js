const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const Movie = model('Movie', movieSchema);
module.exports = Movie;