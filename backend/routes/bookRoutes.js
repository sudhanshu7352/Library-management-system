const express = require('express');
const { addBook, getBooks, updateBook, deleteBook, borrowBook, returnBook } = require('../controllers/bookController');
const { authenticateUserJWT } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/')
    .post(authenticateUserJWT, addBook)
    .get(getBooks);

router.route('/')
    .put(authenticateUserJWT, updateBook)
    .delete(authenticateUserJWT, deleteBook);

router.route('/borrow')
    .put(authenticateUserJWT, borrowBook);

router.route('/return ')
    .put(authenticateUserJWT, returnBook);

module.exports = router;