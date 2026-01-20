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

const DeliveryContact = () => {
    const [area, setArea] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setArea(event.target.value);
    };

    return (
        <div className="contact-fields">
            <FormControl fullWidth size="small" className="field-input">
                <InputLabel id="area-select-label">اختر المنطقة</InputLabel>
                <Select
                    labelId="area-select-label"
                    id="area-select"
                    value={area}
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
                    <MenuItem value={10}>طوباس</MenuItem>
                    <MenuItem value={20}>الجامع القديم</MenuItem>
                    <MenuItem value={30}>الأسكان - ضاحية الحج حسن</MenuItem>
                    <MenuItem value={40}>عقابا</MenuItem>
                    <MenuItem value={50}>الفارعه</MenuItem>
                    <MenuItem value={60}>ميثلون</MenuItem>
                    <MenuItem value={70}>الشاطئ</MenuItem>
                </Select>
            </FormControl>

            <TextField
                fullWidth
                placeholder="أدخل العنوان"
                variant="outlined"
                size="small"
                className="field-input"
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
            />
        </div>
    );
};

export default DeliveryContact;
