import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LoginPayload } from '../types';
import './Login.scss';
import {
    Box,
    Button,
    TextField,
    Paper,
    Alert,
    InputAdornment,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Logo from '../../../components/shared/Logo/Logo';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handelLogin = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        setError('');

        try {
            const payload: LoginPayload = { email, password };

            const res: Response = await fetch(
                `${process.env.REACT_APP_BACKEND_UR}/users/authenticate`,
                {
                    method: 'POST',
                    headers: { 'content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                }
            );

            if (!res.ok) {
                setError('Invalid email or password');
                return;
            }
            const data = await res.json();

            localStorage.setItem('token', data.token);
            navigate('/dashboard');
        } catch (err) {
            setError('Server connection error');
            console.error(err);
        }
    };
    return (
        <div className="login-page">
            <Paper className="login-card" elevation={8}>

                <div className="form-section">
                    <div className="logo-container">
                        <Logo />
                    </div>

                    <div className="welcome-text">
                        <h1>Welcome back!</h1>
                        <p>Please enter your details to sign in.</p>
                    </div>

                    <Box
                        component="form"
                        onSubmit={handelLogin}
                        className="login-form"
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {error && (
                            <Alert severity="error" sx={{ mt: 1, my: 1 }}>
                                {error}
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className="submit-btn"
                        >
                            Log In
                        </Button>


                    </Box>
                </div>
            </Paper>
        </div>
    );
};

export default Login;
