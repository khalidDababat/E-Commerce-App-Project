import React, { useEffect, useState } from 'react';
import {
    Grid,
    Typography,
    Box,
    Container,
    CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Order.scss';
import { getOrders } from '../../api/Orders';
import OrderItem from './OrderItem';
import { Progress } from '../../shared/progresspar/Progress';
import { deleteOrder } from '../../api/Orders';

interface Order {
    id: number;
    status: string;
    total_price: string;
    created_at: string;
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    customer_area: string;
    note: string;
    order_type: string;
}

const MainPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        setLoading(true);
        const data = await getOrders();
        if (data) {
            setOrders(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm('هل انت متاكد من حذف الطلب')) {
            const res = await deleteOrder(id);
            if (res) {
                fetchOrders();
            }
        }
    };

    const handleView = (id: number) => {
        navigate(`/order/${id}`);
    };

    if (loading) {
        return <Progress />;
    }

    return (
        <Container maxWidth="lg" className="order-page" dir="rtl">
            <Box py={4}>
                <Typography
                    variant="h4"
                    gutterBottom
                    align="center"
                    color="primary"
                    fontWeight="bold"
                    sx={{ mb: 4 }}
                >
                    الطلبات الواردة
                </Typography>
                <Grid container spacing={3}>
                    {orders.map((order) => (
                        <Grid size={{ xs: 12, md: 6, lg: 4 }} key={order.id}>
                            <OrderItem
                                order={order}
                                onView={handleView}
                                onDelete={handleDelete}
                            />
                        </Grid>
                    ))}
                    {orders.length === 0 && (
                        <Grid size={{ xs: 12 }}>
                            <Box
                                textAlign="center"
                                py={10}
                                bgcolor="background.paper"
                                borderRadius={2}
                                boxShadow={1}
                            >
                                <Typography color="text.secondary">
                                    لا توجد طلبات حالياً
                                </Typography>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Container>
    );
};

export default MainPage;
