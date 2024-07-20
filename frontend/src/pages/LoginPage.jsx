import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, TextField, Button, Typography, Alert, Snackbar } from '@mui/material';
import StyledContainer from '../components/StyledContainer';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading } = useContext(AuthContext);
    const [error, setError] = useState('');
    //const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await login(email, password);
            if (result) {
                navigate('/');
            }
        } catch (error) {
            console.error('Failed to login', error);
            setError(error.message);
            //setSuccess('');
        }
    };
    const handleRegisterClick = () => {
        navigate('/register');
    };
    const handleClose = () => {
        setError('');
        // setSuccess('');
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
                <Button type="submit" variant="contained" color="primary"
                    fullWidth
                    disabled={loading}
                    style={{ position: 'relative' }}
                >
                    {loading && <CircularProgress size={24} style={{ position: 'absolute', left: '50%', top: '50%', marginLeft: -12, marginTop: -12 }} />}
                    Login
                </Button>
            </form>
            <br />
            <Button onClick={handleRegisterClick} variant="contained" color="success">
                Register
            </Button>
            <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </StyledContainer>
    );
};

export default LoginPage;
