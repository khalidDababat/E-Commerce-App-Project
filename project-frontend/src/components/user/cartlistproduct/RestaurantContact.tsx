import React, { Fragment } from 'react';
import { Box, Typography, TextField, InputAdornment } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

const RestaurantContact = () => {
    return (
        <div className="contact-fields">
            <TextField
                fullWidth
                placeholder="أدخل الاسم"
                variant="outlined"
                size="small"
                className="field-input"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <PersonOutlineIcon sx={{ color: '#757575' }} />
                        </InputAdornment>
                    ),
                }}
            />

            <TextField
                fullWidth
                placeholder="أدخل رقم الجوال"
                variant="outlined"
                size="small"
                className="field-input"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <PhoneIphoneIcon sx={{ color: '#757575' }} />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

export default RestaurantContact;
