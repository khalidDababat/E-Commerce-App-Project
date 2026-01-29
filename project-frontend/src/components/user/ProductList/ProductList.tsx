import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import './ProductList.scss';
import { useProducts } from '../../../hooks/useProducts';

import { useCategoryProducts } from '../../../hooks/useCategoryProducts';

interface ProductListProps {
    selectedCategory: string;
}

const ProductList = ({ selectedCategory }: ProductListProps) => {
    const { products: allProducts, loading: loadingAll } = useProducts();
    const { products: categoryProducts, loading: loadingCategory } =
        useCategoryProducts(
            selectedCategory === 'الكل' ? '' : selectedCategory
        );

    const products =
        selectedCategory === 'الكل' ? allProducts : categoryProducts;
    const loading = selectedCategory === 'الكل' ? loadingAll : loadingCategory;

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Grid container spacing={3} justifyContent="center">
            {Array.isArray(products) &&
                products.map((p: any) => (
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
