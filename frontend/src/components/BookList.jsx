import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchBooks = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/books`);
            setBooks(data);
        };
        fetchBooks();
    }, []);

    const handleBorrow = async (id) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/books/${id}/borrow`, {}, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setBooks(books.map(book => book._id === id ? { ...book, available: false } : book));
        } catch (error) {
            console.error('Failed to borrow book', error);
        }
    };

    const handleReturn = async (id) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/books/${id}/return`, {}, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setBooks(books.map(book => book._id === id ? { ...book, available: true } : book));
        } catch (error) {
            console.error('Failed to return book', error);
        }
    };

    return (
        <Container>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>ISBN</TableCell>
                        <TableCell>Available</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((book) => (
                        <TableRow key={book._id}>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>{book.isbn}</TableCell>
                            <TableCell>{book.available ? 'Yes' : 'No'}</TableCell>
                            <TableCell>
                                {book.available ? (
                                    <Button onClick={() => handleBorrow(book._id)}>Borrow</Button>
                                ) : (
                                    <Button onClick={() => handleReturn(book._id)}>Return</Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default BookList;
