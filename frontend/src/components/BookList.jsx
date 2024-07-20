import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogTitle, DialogContent, Typography, Snackbar, Alert, CircularProgress, TableContainer } from '@mui/material';
import AddBook from './AddBook';
import UpdateBook from './UpdateBook';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/books`);
                //  setTimeout(()=> 
                //     // console.log("wait")
                //  ,3000)
                 setBooks(data)
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch books');
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    const handleBookAdded = (book) => {
        try{
        setBooks([...books, book]);
        setSuccess('Book added successfully');
    } catch (err) {
        setError('Failed to add book');
    }
    };

    const handleBookUpdated = (updatedBook) => {
        setBooks(books.map((book) => (book._id === updatedBook._id ? updatedBook : book)));
        setSelectedBook(null);
        setOpen(false);
    };
     
    const handleClose = () => {
        setError('');
        setSuccess('');
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/books/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setBooks(books.filter((book) => book._id !== id));
        } catch (error) {
            console.error('Failed to delete book', error);
        }
    };

    const handleBorrow = async (id) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/books/${id}/borrow`, {}, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setBooks(books.map((book) => (book._id === id ? { ...book, available: false } : book)));
        } catch (error) {
            console.error('Failed to borrow book', error);
        }
    };

    const handleReturn = async (id) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/books/${id}/return`, {}, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setBooks(books.map((book) => (book._id === id ? { ...book, available: true } : book)));
        } catch (error) {
            console.error('Failed to return book', error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect to the login page after logout
    };


    return (
        <Container style={{ marginTop: "5px" }}>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
                Logout
            </Button>
            <AddBook onBookAdded={handleBookAdded} />
            <Typography variant="h4" gutterBottom>
                Book List
            </Typography>
            {loading ? (
                <CircularProgress/>
            ) : (
                <TableContainer> 
            <Table >
                <TableHead>
                    <TableRow sx={{
                        fontWeight: 'bolder',
                        backgroundColor: '#f0f0f0',
                    }}>
                        <TableCell> <b>Title</b></TableCell>
                        <TableCell><b>Author</b> </TableCell>
                        <TableCell><b>ISBN</b></TableCell>
                        <TableCell><b>Available</b></TableCell>
                        <TableCell><b>Actions</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((book) => (
                        <TableRow key={book._id}>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>{book.isbn}</TableCell>
                            <TableCell sx={{
                                color: book.available ? 'green' : 'red',
                                fontWeight: 'bold',
                            }}>{book.available ? 'Yes' : 'No'}</TableCell>
                            <TableCell>
                                {book.available ? (
                                    <Button onClick={() => handleBorrow(book._id)}>Borrow</Button>
                                ) : (
                                    <Button onClick={() => handleReturn(book._id)}>Return</Button>
                                )}
                                <Button onClick={() => { setSelectedBook(book); setOpen(true); }}>Update</Button>
                                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(book._id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
            )}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Update Book</DialogTitle>
                <DialogContent>
                    {selectedBook && <UpdateBook book={selectedBook} onBookUpdated={handleBookUpdated} />}
                </DialogContent>
            </Dialog>
            <Snackbar open={Boolean(success)} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {success}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default BookList;
