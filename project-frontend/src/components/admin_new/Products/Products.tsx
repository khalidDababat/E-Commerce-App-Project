import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import { fetchProduct } from '../../../store/features/productsSlice';
import { useProducts } from '../../../hooks/useProducts';
import ProductItem from './ProductItem';
import {
    Box,
    Grid,
    Typography,
    Button,
    IconButton,
    Chip,
    Container,
    CircularProgress,
    Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import SearchInput from '../../shared/SearchInput/SearchInput';
import UpdateProduct from '../UpdateProduct/UpdateProduct';

import './Products.scss';
import { Product } from '../../../types';

const Products = () => {
    const [selectProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showModel, setShowModel] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();

    const { products, loading } = useProducts();

    const addProduct = () => {
        navigate('/createProduct');
    };

    const handelUpdate = (p: Product) => {
        setSelectedProduct(p);
        setShowModel(true);
    };

    const handelCloseModel = () => {
        setShowModel(false);
        setSelectedProduct(null);
    };
    const handleUpdateSuccess = () => {
        dispatch(fetchProduct());
        handelCloseModel();
    };

    return (
        <Container maxWidth="xl">
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
                mb={4}
            >
                <SearchInput />
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={addProduct}
                    sx={{ borderRadius: 1 }}
                >
                    إضافة منتج جديد
                </Button>
            </Stack>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 25 }}>
                    <CircularProgress />
                </Box>
            ) : products.length > 0 ? (
                <Grid container spacing={3}>
                    {products.map((item: any) => (
                        <Grid
                            key={item.id}
                            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                        >
                            <ProductItem product={item} onEdit={handelUpdate} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h6" color="text.secondary">
                        لا يوجد منتجات
                    </Typography>
                </Box>
            )}

            {showModel && selectProduct && (
                <UpdateProduct
                    product={selectProduct}
                    onClose={handelCloseModel}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            )}
        </Container>
    );
};

export default Products;
