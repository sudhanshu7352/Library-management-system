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

const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, isbn, available } = req.body;

    const book = await Book.findById(id);

    if (book) {
        book.title = title || book.title;
        book.author = author || book.author;
        book.isbn = isbn || book.isbn;
        book.available = available !== undefined ? available : book.available;

        const updatedBook = await book.save();
        res.json(updatedBook);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
};

const deleteBook = async (req, res) => {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (book) {
        await book.remove();
        res.json({ message: 'Book removed' });
    } else {
        res.status(404).json({ message: 'Book not found' });
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
