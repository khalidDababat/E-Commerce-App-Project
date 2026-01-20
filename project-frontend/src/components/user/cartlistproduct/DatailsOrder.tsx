import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

interface DatailsOrderProps {
    total: number;
}

const DatailsOrder: React.FC<DatailsOrderProps> = ({ total }) => {
    return (
        <Box
            className="cart-card"
            sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
        >
            <Typography variant="body1" color="textSecondary">
                تفاصيل الطلب
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>الطلب</Typography>
                <Typography>{total} ₪</Typography>
            </Box>

            <Divider />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ color: '#005c61', fontWeight: 'bold' }}>
                    الإجمالي
                </Typography>
                <Typography sx={{ color: '#005c61', fontWeight: 'bold' }}>
                    {total} ₪
                </Typography>
            </Box>
        </Box>
    );
};

export default DatailsOrder;
