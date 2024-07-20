const Book = require('../models/Book');

const addBook = async (req, res) => {
    const { title, author, isbn } = req.body;

    const bookExists = await Book.findOne({ isbn });
    if (bookExists) {
        return res.status(400).json({ message: 'Book already exists' });
    }

    const book = await Book.create({ title, author, isbn });

    if (book) {
        res.status(201).json(book);
    } else {
        res.status(400).json({ message: 'Invalid book data' });
    }
};

const getBooks = async (req, res) => {
    const books = await Book.find();
    res.json(books);
};

const updateBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(updatedBook);
    } catch (error) {
        next(error); // Passing error to the global error handler
    }
};

const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        next(error);
    }
};

const borrowBook = async (req, res) => {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (book && book.available) {
        book.available = false;
        await book.save();
        res.json({ message: 'Book borrowed' });
    } else {
        res.status(404).json({ message: 'Book not available' });
    }
};

const returnBook = async (req, res) => {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (book && !book.available) {
        book.available = true;
        await book.save();
        res.json({ message: 'Book returned' });
    } else {
        res.status(404).json({ message: 'Book not found or already available' });
    }
};

module.exports = { addBook, getBooks, updateBook, deleteBook, borrowBook, returnBook };
