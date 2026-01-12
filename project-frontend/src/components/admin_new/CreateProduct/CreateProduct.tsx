import React from 'react';

import { Container, Typography, Box, Alert } from '@mui/material';
import ProductForm from '../ProductForm/ProductForm';
import { createNewProduct } from '../api/CreateProduct';
import { useNavigate } from 'react-router';

const CreateProduct = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <ProductForm
                    onSubmit={createNewProduct}
                    onCancel={() => navigate('/products')}
                    submitLabel="إنشاء المنتج"
                />
            </Box>
        </Container>
    );
};

export default CreateProduct;
