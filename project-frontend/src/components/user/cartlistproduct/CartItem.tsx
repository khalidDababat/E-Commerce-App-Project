import React from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface CartItemProps {
    item: {
        id: number;
        name: string;
        price: number;
        quantity: number;
        image: string;
    };
    onIncrease: (id: number) => void;
    onDecrease: (id: number) => void;
    onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
    item,
    onIncrease,
    onDecrease,
    onRemove,
}) => {
    return (
        <Box
            className="cart-card"
            sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
        >
            <Box
                component="img"
                src={`${process.env.REACT_APP_BACKEND_URL}${item.image}`}
                alt={item.name}
                sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 2,
                    objectFit: 'cover',
                }}
            />

            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {item.name}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography
                        variant="h6"
                        sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                    >
                        {item.price} ₪
                    </Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: 1,
                }}
            >
                <Button
                    startIcon={<DeleteOutlineIcon />}
                    color="error"
                    onClick={() => onRemove(item.id)}
                    sx={{ gap: 1 }}
                >
                    حذف
                </Button>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        p: '2px',
                    }}
                >
                    <IconButton
                        size="small"
                        onClick={() => onIncrease(item.id)}
                        sx={{ p: '2px' }}
                    >
                        <AddIcon fontSize="small" />
                    </IconButton>
                    <Typography
                        sx={{ mx: 2, minWidth: '20px', textAlign: 'center' }}
                    >
                        {item.quantity < 10
                            ? `0${item.quantity}`
                            : item.quantity}
                    </Typography>
                    <IconButton
                        size="small"
                        onClick={() => onDecrease(item.id)}
                        sx={{ p: '2px' }}
                    >
                        <RemoveIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default CartItem;
