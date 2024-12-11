import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            await login(username, password);
            navigate("/");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <Container sx={{ mt: 8 }} maxWidth="xs">
            <Paper sx={{ p: 4 }} elevation={3}>
                <Typography variant="h5" gutterBottom>Login</Typography>
                {error && <Typography color="error" variant="body2">{error}</Typography>}
                <TextField
                    fullWidth
                    label="Username"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Password"
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button sx={{ mt: 2 }} variant="contained" fullWidth onClick={handleSubmit}>
                    Login
                </Button>
                <Box mt={2}>
                    <Typography variant="body2">
                        <strong>Demo:</strong><br />
                        Admin: username: <b>admin</b>, password: <b>password</b><br />
                        User: username: <b>test</b>, password: <b>password</b>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
