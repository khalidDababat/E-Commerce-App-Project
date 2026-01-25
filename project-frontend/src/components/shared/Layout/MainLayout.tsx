import React from 'react';
import MainHeader from '../Headers/MainHeader';
import Category from '../../user/Category/Category';
import ProductList from '../../user/ProductList/ProductList';
import { Container, Grid } from '@mui/material';
import Footer from '../../user/footer/Footer';
import './MainLayout.scss';

const MainLayout = () => {
    return (
        <div>
            <MainHeader />

            <Container maxWidth="lg" className="main-layout-container">
                <Grid container spacing={4} className="layout-grid">
                    <Grid size={12} className="category-wrapper">
                        <Category />
                    </Grid>

                    <Grid size={12} className="product-wrapper">
                        <ProductList />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    );
};
export default MainLayout;
