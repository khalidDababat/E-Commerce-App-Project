import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Box,
    Grid,
    Divider,
    Stack,
    IconButton,
    CircularProgress,
    Button,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Select,
    MenuItem,
    FormControl,
    SelectChangeEvent,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';

import { getOrderById, updateOrderStatus } from '../../api/Orders';
import { formatDate, formatTime } from '../../../utilities/FormatDateTime';
import { Progress } from '../../shared/progresspar/Progress';

interface OrderProduct {
    product_id: number;
    name: string;
    price: string;
    quantity: number;
}

interface OrderDetails {
    order_id: number;
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    customer_area: string;
    note: string | null;
    status: string;
    total_price: string;
    created_at: string;
    products: OrderProduct[];
}

const ViewOrder = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [order, setOrder] = useState<OrderDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!id) return;
            setLoading(true);
            const data = await getOrderById(parseInt(id));
            if (data) {
                setOrder(data);
            }
            setLoading(false);
        };
        fetchOrder();
    }, [id]);

    const handleStatusChange = async (event: SelectChangeEvent) => {
        const newStatus = event.target.value;
        if (!id || !order) return;

        const success = await updateOrderStatus(parseInt(id), newStatus);
        if (success) {
            setOrder({ ...order, status: newStatus });
        }
    };

    if (loading) {
        <Progress />;
    }

    if (!order) {
        return (
            <Container maxWidth="md">
                <Box py={10} textAlign="center">
                    <Typography variant="h3" color="error">
                        الطلب غير موجود
                    </Typography>
                    <Button
                        startIcon={<ArrowForwardIcon sx={{ ml: 1 }} />}
                        onClick={() => navigate('/order')}
                        sx={{ mt: 2 }}
                    >
                        العودة للطلبات
                    </Button>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" className="view-order-container" dir="rtl">
            <Box py={5}>
                <Stack direction="row" alignItems="center" spacing={2} mb={4}>
                    <IconButton
                        onClick={() => navigate('/order')}
                        color="primary"
                    >
                        <ArrowForwardIcon />
                    </IconButton>
                    <Typography variant="h5" fontWeight="bold" color="primary">
                        تفاصيل الطلب #{order.order_id}
                    </Typography>
                </Stack>

                <Grid container spacing={3}>
                    {/* Customer Information */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card elevation={2}>
                            <CardContent>
                                <Stack spacing={3}>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={3}
                                        color="primary.main"
                                    >
                                        <PersonIcon />
                                        <Typography
                                            variant="h5"
                                            fontWeight="bold"
                                        >
                                            معلومات الزبون
                                        </Typography>
                                    </Stack>

                                    <Box>
                                        <Typography
                                            variant="h5"
                                            fontWeight="bold"
                                            color="text.secondary"
                                        >
                                            الإسم{' '}
                                        </Typography>
                                        <Typography variant="h6">
                                            {order.customer_name}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography
                                            variant="h5"
                                            fontWeight="bold"
                                            color="text.secondary"
                                        >
                                            رقم الهاتف
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={1}
                                        >
                                            <PhoneIcon
                                                fontSize="small"
                                                color="action"
                                            />
                                            <Typography variant="h6">
                                                {order.customer_phone}
                                            </Typography>
                                        </Stack>
                                    </Box>

                                    <Box>
                                        <Typography
                                            variant="h5"
                                            fontWeight="bold"
                                            color="text.secondary"
                                        >
                                            العنوان والمنطقة
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            alignItems="flex-start"
                                            spacing={3}
                                        >
                                            <LocationOnIcon
                                                fontSize="small"
                                                color="action"
                                                sx={{ mt: 0.5 }}
                                            />
                                            <Typography variant="h6">
                                                {order.customer_area}{' '}
                                                {order.customer_address
                                                    ? `- ${order.customer_address}`
                                                    : ''}
                                            </Typography>
                                        </Stack>
                                    </Box>

                                    <Divider />

                                    <Box>
                                        <Typography
                                            variant="h5"
                                            fontWeight="bold"
                                            color="text.secondary"
                                        >
                                            ملاحظات
                                        </Typography>
                                        <Typography variant="body2">
                                            {order.note || 'لا توجد ملاحظات'}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Order Details & Products */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Stack spacing={3}>
                            <Card elevation={2}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 6, sm: 3 }}>
                                            <Typography
                                                variant="subtitle2"
                                                color="text.secondary"
                                            >
                                                تاريخ الطلب
                                            </Typography>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                spacing={1}
                                            >
                                                <CalendarMonthIcon
                                                    fontSize="medium"
                                                    color="action"
                                                />
                                                <Typography variant="body2">
                                                    {formatDate(
                                                        order.created_at
                                                    )}
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid size={{ xs: 6, sm: 3 }}>
                                            <Typography
                                                variant="subtitle2"
                                                color="text.secondary"
                                            >
                                                الوقت
                                            </Typography>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                spacing={1}
                                            >
                                                <AccessTimeIcon
                                                    fontSize="medium"
                                                    color="action"
                                                />
                                                <Typography variant="body2">
                                                    {formatTime(
                                                        order.created_at
                                                    )}
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid size={{ xs: 6, sm: 3 }}>
                                            <Typography
                                                variant="subtitle2"
                                                color="text.secondary"
                                                gutterBottom
                                            >
                                                الحالة
                                            </Typography>
                                            <FormControl size="small">
                                                <Select
                                                    value={order.status}
                                                    onChange={
                                                        handleStatusChange
                                                    }
                                                    sx={{
                                                        bgcolor: '#fff3e0',
                                                        color: '#e65100',
                                                        fontWeight: 'bold',
                                                        '.MuiOutlinedInput-notchedOutline':
                                                            { border: 'none' },
                                                    }}
                                                >
                                                    <MenuItem value="pending">
                                                        قيد الانتظار
                                                    </MenuItem>
                                                    <MenuItem value="processing">
                                                        جاري التجهيز
                                                    </MenuItem>
                                                    <MenuItem value="delivered">
                                                        تم الاستلام
                                                    </MenuItem>
                                                    <MenuItem value="cancelled">
                                                        ملغي
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid size={{ xs: 6, sm: 3 }}>
                                            <Typography
                                                variant="subtitle2"
                                                color="text.secondary"
                                            >
                                                السعر الكلي
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                color="secondary"
                                                fontWeight="bold"
                                            >
                                                ₪{order.total_price}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                            <TableContainer component={Paper} elevation={2}>
                                <Box p={2} borderBottom="1px solid #eee">
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={3}
                                        color="primary.main"
                                    >
                                        <ReceiptIcon />
                                        <Typography
                                            variant="h5"
                                            fontWeight="bold"
                                        >
                                            المنتجات المطلوبة
                                        </Typography>
                                    </Stack>
                                </Box>
                                <Table>
                                    <TableHead sx={{ bgcolor: '#fbfbfb' }}>
                                        <TableRow>
                                            <TableCell
                                                align="right"
                                                sx={{ fontWeight: 'bold' }}
                                            >
                                                المنتج
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{ fontWeight: 'bold' }}
                                            >
                                                السعر
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{ fontWeight: 'bold' }}
                                            >
                                                الكمية
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                sx={{ fontWeight: 'bold' }}
                                            >
                                                المجموع
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {order.products.map((product) => (
                                            <TableRow key={product.product_id}>
                                                <TableCell align="right">
                                                    {product.name}
                                                </TableCell>
                                                <TableCell align="center">
                                                    ₪{product.price}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {product.quantity}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    sx={{
                                                        fontWeight: 'medium',
                                                    }}
                                                >
                                                    ₪
                                                    {(
                                                        parseFloat(
                                                            product.price
                                                        ) * product.quantity
                                                    ).toFixed(2)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell colSpan={3} align="left">
                                                <Typography
                                                    variant="h6"
                                                    fontWeight="bold"
                                                >
                                                    المجموع الكلي:
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography
                                                    variant="h6"
                                                    color="secondary"
                                                    fontWeight="bold"
                                                >
                                                    ₪{order.total_price}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default ViewOrder;
