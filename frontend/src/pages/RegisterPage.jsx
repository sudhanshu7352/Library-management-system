import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';
import StyledContainer from '../components/StyledContainer';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(username, email, password);
            navigate('/login');
        } catch (error) {
            console.error('Failed to register', error);
        }
    };
    const handleLoginClick = () => {
        navigate('/login');
    };
    return (
        <StyledContainer>
            <Typography variant="h4">Register</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Register
                </Button>
            </form>
            <br />
            <Button onClick={handleLoginClick} variant="outlined" color="success">
                Login
            </Button>
        </StyledContainer>
    );
};

export default RegisterPage;
