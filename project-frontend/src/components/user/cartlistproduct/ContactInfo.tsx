import React from 'react';
import {
    Box,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';

import RestaurantContact from './RestaurantContact';
import PickupContact from './PickupContact';

import DeliveryContact from './DeliveryContact';

const ContactInfo = () => {
    const [method, setMethod] = React.useState('restaurant');

    const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMethod(event.target.value);
    };

    return (
        <div className="contact-info">
            <Typography variant="body1" className="contact-info_title">
                بيانات التواصل
            </Typography>

            <RadioGroup row value={method} onChange={handleMethodChange}>
                <Box className="delivery-options">
                    <FormControlLabel
                        value="delivery"
                        control={<Radio size="small" />}
                        label="توصيل"
                        className={`option-item ${method === 'delivery' ? 'selected' : ''}`}
                    />
                    <FormControlLabel
                        value="pickup"
                        control={<Radio size="small" />}
                        label="استلم بنفسك"
                        className={`option-item ${method === 'pickup' ? 'selected' : ''}`}
                    />
                    <FormControlLabel
                        value="restaurant"
                        control={<Radio size="small" />}
                        label="الأكل بالمطعم"
                        className={`option-item ${method === 'restaurant' ? 'selected' : ''}`}
                    />
                </Box>
            </RadioGroup>

            {method === 'restaurant' && <RestaurantContact />}
            {method === 'pickup' && <PickupContact />}
            {method === 'delivery' && <DeliveryContact />}
        </div>
    );
};

export default ContactInfo;
