import React from 'react';
import { Box, Typography } from '@mui/material';

const CouponSection = () => {
    return (
        <Box
            sx={{
                border: '1px solid #005c61',
                borderRadius: 2,
                p: 2,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: 'rgba(0, 92, 97, 0.05)',
                },
            }}
        >
            <Typography variant="body1" sx={{ color: '#00897b' }}>
                هل لديك كوبون خصم؟
            </Typography>
        </Box>
    );
};

export default CouponSection;
