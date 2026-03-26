import React, { useState } from 'react';
import signUp from '../../../assets/images/signUp.png';
import './SignUp.scss';
import {
    Box,
    Button,
    TextField,
    InputAdornment,
    IconButton,
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import Logo from '../../../components/shared/Logo/Logo';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);

    return (
        <div className="signup-page">
            <div className="hero-part">
                <div className="img_part">
                    <img src={signUp} alt="signUp" />
                </div>
            </div>

            <div className="signup_part">
                <div className="login_content">
                    <div className="form-section">
                        <div className="logo-container">
                            <Logo />
                        </div>

                        <div className="welcome-text">
                            <h1>إنشاء حساب</h1>
                            <p>
                                ابدأ تجربتك مع نظامنا الذكي لإدارة طلبات مطعمك
                            </p>
                        </div>

                        <Box component="form" className="login-form" dir="rtl">
                            <div className="input-group">
                                <label htmlFor="username">اسم الأول</label>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    name="username"
                                    placeholder="أدخل اسم الأول"
                                    autoFocus
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon className="input-icon" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="username">اسم الثاني</label>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    name="username"
                                    placeholder="أدخل اسم الثاني"
                                    autoFocus
                                    className="input-text"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon className="input-icon" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="email">البريد الإلكتروني</label>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="example@email.com"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon className="input-icon" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="password">كلمة المرور</label>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="*****"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon className="input-icon" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="confirmPassword">
                                    تأكيد كلمة المرور
                                </label>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    id="confirmPassword"
                                    placeholder="*****"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon className="input-icon" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle confirm password visibility"
                                                    onClick={
                                                        handleClickShowConfirmPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="phone">رقم الهاتف</label>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="0591234567"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneIcon className="input-icon" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className="submit-btn"
                                onClick={() => alert('غير مفعلة الان')}
                            >
                                إنشاء حساب
                            </Button>

                            <div className="register-link">
                                <p>لديك حساب بالفعل؟</p>
                                <Link to="/login">تسجيل الدخول</Link>
                            </div>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
