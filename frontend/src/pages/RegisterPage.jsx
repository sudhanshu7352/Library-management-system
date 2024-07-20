import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import StyledContainer from '../components/StyledContainer';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register, loading } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let result = await register(username, email, password);
            console.log('res: ', result)
            if (result) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Failed to register', error);
            setError(error.message);
        }
    };
    const handleLoginClick = () => {
        navigate('/login');
    };
    const handleClose = () => {
        setError('');
        // setSuccess('');
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
                <Button type="submit" variant="contained" color="primary"
                    fullWidth
                    disabled={loading}
                    style={{ position: 'relative' }}
                >
                    {loading && <CircularProgress size={24} style={{ position: 'absolute', left: '50%', top: '50%', marginLeft: -12, marginTop: -12 }} />}
                    Register
                </Button>
            </form>
            <br />
            <Button onClick={handleLoginClick} variant="outlined" color="success">
                Login
            </Button>
            <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </StyledContainer>
    );
};

export default RegisterPage;
