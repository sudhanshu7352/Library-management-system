import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';
import StyledContainer from './StyledContainer';

const AddBook = ({ onBookAdded }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const { user } = useContext(AuthContext);
    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API_URL}/books`,
                { title, author, isbn },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            onBookAdded(data);
            setTitle('');
            setAuthor('');
            setIsbn('');
            // setLoading(true);
        } catch (error) {
            console.error('Failed to add book', error);
        }
    };

    return (
        <StyledContainer >
            <Typography variant="h5">Add Book</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="ISBN"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Add Book
                </Button>
                
            </form>
        </StyledContainer>
    );
};

export default AddBook;
