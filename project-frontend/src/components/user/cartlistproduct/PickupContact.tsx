import React from 'react';
import RestaurantContact from './RestaurantContact';
import TextField from '@mui/material/TextField';

const PickupContact = () => {
    return (
        <div className="contact-fields">
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

export default PickupContact;
