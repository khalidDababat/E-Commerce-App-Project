import React, { useState } from 'react';
import RestaurantContact from './RestaurantContact';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import HomeIcon from '@mui/icons-material/Home';
import InputAdornment from '@mui/material/InputAdornment';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Store/Store';
import {
    setCustomerArea,
    setCustomerAddress,
    setOrderNote,
} from '../../../Store/features/orderSlice';

const DeliveryContact = () => {
    const dispatch = useDispatch();
    const { customer_area, customer_address, note } = useSelector(
        (state: RootState) => state.order
    );

    const handleChange = (event: SelectChangeEvent) => {
        dispatch(setCustomerArea(event.target.value as string));
    };

    return (
        <div className="contact-fields">
            <FormControl fullWidth size="small" className="field-input">
                <InputLabel id="area-select-label">اختر المنطقة</InputLabel>
                <Select
                    labelId="area-select-label"
                    id="area-select"
                    value={customer_area}
                    label="اختر المنطقة"
                    onChange={handleChange}
                    startAdornment={
                        <InputAdornment
                            position="start"
                            sx={{ marginRight: 1 }}
                        >
                            <LocationOnIcon sx={{ color: '#757575' }} />
                        </InputAdornment>
                    }
                >
                    <MenuItem value="طوباس">طوباس</MenuItem>
                    <MenuItem value="الجامع القديم">الجامع القديم</MenuItem>
                    <MenuItem value="الأسكان - ضاحية الحج حسن">
                        الأسكان - ضاحية الحج حسن
                    </MenuItem>
                    <MenuItem value="عقابا">عقابا</MenuItem>
                    <MenuItem value="الفارعه">الفارعه</MenuItem>
                    <MenuItem value="ميثلون">ميثلون</MenuItem>
                    <MenuItem value="الشاطئ">الشاطئ</MenuItem>
                </Select>
            </FormControl>

            <TextField
                fullWidth
                placeholder="أدخل العنوان"
                variant="outlined"
                size="small"
                className="field-input"
                value={customer_address}
                onChange={(e) => dispatch(setCustomerAddress(e.target.value))}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <HomeIcon sx={{ color: '#757575' }} />
                        </InputAdornment>
                    ),
                }}
            />

            <RestaurantContact />

            <TextField
                fullWidth
                multiline
                minRows={3}
                placeholder="ملاحظات إضافية للطلب"
                variant="outlined"
                size="small"
                className="field-input"
                value={note}
                onChange={(e) => dispatch(setOrderNote(e.target.value))}
            />
        </div>
    );
};

export default DeliveryContact;
