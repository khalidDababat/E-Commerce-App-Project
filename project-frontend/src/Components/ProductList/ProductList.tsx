import React from 'react';
import ProductItem from '../ProductItem/ProductItem';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './ProductList.scss';
import { useProducts } from '../../Hook/useProducts';

const ProductList = () => {
    const { products, loading } = useProducts();

    if (loading) return <h2>Loading...</h2>;

    return (
        <Container>
            <Row>
                {products.map((p: any) => (
                    <Col key={p.id} sm={12} md={6} lg={4} xl={4}>
                        <ProductItem
                            name={p.name}
                            price={p.price}
                            image={p.image}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductList;
