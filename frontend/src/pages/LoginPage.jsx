import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';
import StyledContainer from '../components/StyledContainer';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            console.error('Failed to login', error);
        }
    };
    const handleRegisterClick = () => {
        navigate('/register');
    };
    return (
        <StyledContainer>
            <Typography variant="h4">Login</Typography>
            <form onSubmit={handleSubmit}>
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
                    Login
                </Button>
            </form>
            <br />
            <Button onClick={handleRegisterClick} variant="contained" color="success">
                Register
            </Button>
        </StyledContainer>
    );
};

export default LoginPage;
