import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import './ProductList.scss';
import { useProducts } from '../../../hooks/useProducts';

const ProductList = () => {
    const { products, loading } = useProducts();

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress color="inherit" />
            </Box>
        );
    }

    return (
        <Grid container spacing={3} justifyContent="center">
            {products.map((p: any) => (
                <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                    <ProductItem
                        id={p.id}
                        name={p.name}
                        price={p.price}
                        image={p.image}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;
