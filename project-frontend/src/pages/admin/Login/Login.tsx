import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LoginPayload } from '../../types';
import './Login.scss';
import {
    Box,
    Button,
    TextField,
    Alert,
    InputAdornment,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Logo from '../../../components/shared/Logo/Logo';
import hero_image from '../../../assets/images/login.png';

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
                `${process.env.REACT_APP_BACKEND_URL}/users/authenticate`,
                {
                    method: 'POST',
                    headers: { 'content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                }
            );

            if (!res.ok) {
                setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
                return;
            }
            const data = await res.json();

            localStorage.setItem('token', data.token);
            navigate('/dashboard');
        } catch (err) {
            setError('خطأ في الاتصال بالخادم');
            console.error(err);
        }
    };

    return (
        <div className="login-page">


            <div className="hero-part">
                <div className="hero_content">
                    <img src={hero_image} alt="hero_image" />
                </div>
            </div>
            <div className="login_part">

                <div className="login_content">
                    <div className="form-section">
                        <div className="logo-container">
                            <Logo />
                        </div>

                        <div className="welcome-text">
                            <h1>تسجيل الدخول</h1>
                            <p>أدخل بياناتك للوصول إلى لوحة التحكم الخاصة بك</p>
                        </div>

                        <Box
                            component="form"
                            onSubmit={handelLogin}
                            className="login-form"
                            dir="rtl"
                        >
                            {error && (
                                <Alert severity="error" sx={{ mt: 1, my: 1 }}>
                                    {error}
                                </Alert>
                            )}

                            <label htmlFor="email">البريد الإلكتروني</label>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"

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
                            <label>
                                كلمة المرور
                            </label>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"

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

                            <div className="forget-password">
                                <Link to="/forgot-password">نسيت كلمة المرور؟</Link>
                            </div>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className="submit-btn"
                            >
                                تسجيل الدخول
                            </Button>

                            <div className="register-link">
                                <p>ليس لديك حساب؟</p>
                                <Link to="/register_admin">سجل الآن</Link>
                            </div>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
