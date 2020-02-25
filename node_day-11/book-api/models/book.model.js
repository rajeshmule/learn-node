const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String
    }
}, { timestamps: true });

const books = model('books', bookSchema);
module.exports = books;