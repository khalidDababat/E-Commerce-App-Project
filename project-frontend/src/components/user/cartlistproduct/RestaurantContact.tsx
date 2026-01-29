import React, { Fragment } from 'react';
import { Box, Typography, TextField, InputAdornment } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Store/Store';
import {
    setCustomerName,
    setCustomerPhone,
} from '../../../Store/features/orderSlice';

const RestaurantContact = () => {
    const dispatch = useDispatch();
    const { customer_name, customer_phone } = useSelector(
        (state: RootState) => state.order
    );

    return (
        <div className="contact-fields">
            <TextField
                fullWidth
                placeholder="أدخل الاسم"
                variant="outlined"
                size="small"
                className="field-input"
                value={customer_name}
                onChange={(e) => dispatch(setCustomerName(e.target.value))}
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
                value={customer_phone}
                onChange={(e) => dispatch(setCustomerPhone(e.target.value))}
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
