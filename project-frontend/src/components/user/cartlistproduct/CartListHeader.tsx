import React from 'react';
import ArrowForwardIcon from '../../shared/ArrowForwardIcon/ArrowForwardIcon';
import { useNavigate } from 'react-router-dom';
import { Typography, IconButton } from '@mui/material';

interface CartListHeaderProps {
    onBack: () => void;
}

const CartListHeader = ({ onBack }: CartListHeaderProps) => {
    return (
        <div className="card-list_header">
            <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                سلة المشتريات
            </Typography>
            <ArrowForwardIcon onClick={onBack} />
        </div>
    );
};

export default CartListHeader;
