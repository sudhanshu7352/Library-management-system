import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';

const UpdateBook = ({ book, onBookUpdated }) => {
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [isbn, setIsbn] = useState(book.isbn);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        setTitle(book.title);
        setAuthor(book.author);
        setIsbn(book.isbn);
    }, [book]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `${process.env.REACT_APP_API_URL}/books/${book._id}`,
                { title, author, isbn },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            onBookUpdated(data);
        } catch (error) {
            console.error('Failed to update book', error);
        }
    };

    return (
        <Container>
            <Typography variant="h5">Update Book</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="ISBN"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Update Book
                </Button>
            </form>
        </Container>
    );
};

export default UpdateBook;
