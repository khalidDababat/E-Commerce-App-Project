import { useState, useEffect } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import './ProductList.scss';
import { useProducts } from '../../../hooks/useProducts';

import { getProductsByCategoryName } from '../../api/Category';

interface ProductListProps {
    selectedCategory: string;
}

const ProductList: React.FC<ProductListProps> = ({ selectedCategory }) => {
    const [categoryProducts, setCategoryProducts] = useState<any[]>([]);
    const [loadingCategory, setLoadingCategory] = useState(false);

    // Use the appropriate hook for all products
    const { products: allProducts, loading: loadingAll } = useProducts();

    useEffect(() => {
        const fetchByCategory = async () => {
            if (selectedCategory !== 'الكل') {
                setLoadingCategory(true);
                try {
                    const data =
                        await getProductsByCategoryName(selectedCategory);
                    console.log('data', data);
                    setCategoryProducts(data);
                } catch (error) {
                    console.error(
                        'Error fetching products by category:',
                        error
                    );
                } finally {
                    setLoadingCategory(false);
                }
            } else {
                setCategoryProducts([]);
            }
        };

        fetchByCategory();
    }, [selectedCategory]);

    const isLoading =
        selectedCategory === 'الكل' ? loadingAll : loadingCategory;
    const productsToDisplay =
        selectedCategory === 'الكل' ? allProducts : categoryProducts;

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Grid container spacing={3} justifyContent="center">
            {Array.isArray(productsToDisplay) &&
                productsToDisplay.map((p: any) => (
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
