const Books = require('../models/book.model');

exports.createBook = async (req, res, next) =>
{
    try {
        const data = req.body;
        const book = await Books.create(data);
        res.status(200).json({ book });
    } catch (error) {
        next(error);
    }
}

exports.listOfAllBooks = async (req, res, next) =>
{
    try {
        const books = await Books.find();
        res.status(200).json({ books });
    } catch (error) {
        next(error);
    }
}

exports.getOneBook = async (req, res, next) =>
{
    try {
        const id = req.params.id;
        const book = await Books.findById(id);
        res.status(200).json({ book });
    } catch (error) {
        next(error);
    }
}

exports.removeBook = async (req, res, next) =>
{
    try {
        const id = req.params.id;
        const book = await Books.findByIdAndRemove(id);
        res.status(200).json({ book });
    } catch (error) {
        next(error);
    }
}

exports.editBook = async (req, res, next) =>
{
    try {
        const id = req.params.id;
        const data = req.body;
        await Books.findByIdAndUpdate(id, data);
        const book = await Books.findById(id);
        res.status(200).json({ book });
    } catch (error) {
        next(error);

    }
}