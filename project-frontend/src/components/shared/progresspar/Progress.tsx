import react from 'react';
import { Box, CircularProgress } from '@mui/material';

export const Progress = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="60vh"
        >
            <CircularProgress />
        </Box>
    );
};
