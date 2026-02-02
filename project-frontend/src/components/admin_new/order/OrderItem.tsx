import React from 'react';
import {
    Grid,
    Paper,
    Typography,
    Box,
    Chip,
    IconButton,
    Tooltip,
    Stack,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { formatDate, formatTime } from '../../../utilities/FormatDateTime';

interface OrderItemProps {
    order: {
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
    };
    onView: (id: number) => void;
    onDelete: (id: number) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, onView, onDelete }) => {
    return (
        <Paper elevation={2} className="order-item-card">
            <Box p={2}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Typography variant="h6" color="primary" fontWeight="bold">
                        #{order.id}
                    </Typography>
                    <Stack direction="row" gap={2}>
                        <Chip
                            label={
                                order.order_type === 'pickup'
                                    ? 'استلم بنفسك'
                                    : order.order_type === 'restaurant'
                                      ? 'في المطعم'
                                      : 'توصيل'
                            }
                            size="small"
                            className={`type-chip ${order.order_type}`}
                        />
                        <Chip
                            label={
                                order.status === 'pending'
                                    ? 'قيد الانتظار'
                                    : order.status
                            }
                            size="small"
                            color="warning"
                            variant="outlined"
                        />
                    </Stack>
                </Stack>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {order.customer_name}
                        </Typography>
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            color="text.secondary"
                        >
                            <PhoneIcon fontSize="small" />
                            <Typography variant="body2">
                                {order.customer_phone}
                            </Typography>
                        </Stack>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Stack
                            direction="row"
                            className="order-time-container"
                            justifyContent={{
                                xs: 'flex-start',
                                sm: 'flex-end',
                            }}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={0.5}
                                color="text.secondary"
                            >
                                <CalendarMonthIcon fontSize="small" />
                                <Typography variant="body2">
                                    {formatDate(order.created_at)}
                                </Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={0.5}
                                color="text.secondary"
                            >
                                <AccessTimeIcon fontSize="small" />
                                <Typography variant="body2">
                                    {formatTime(order.created_at)}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Stack
                            direction="row"
                            alignItems="flex-start"
                            spacing={1}
                            color="text.secondary"
                        >
                            <LocationOnIcon fontSize="small" sx={{ mt: 0.5 }} />
                            <Typography variant="body2" align="right">
                                {order.customer_area}{' '}
                                {order.customer_address
                                    ? `- ${order.customer_address}`
                                    : ''}
                            </Typography>
                        </Stack>
                    </Grid>

                    {order.note && (
                        <Grid size={{ xs: 12 }}>
                            <Box bgcolor="#f5f5f5" p={1} borderRadius={1}>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    ملاحظات: {order.note}
                                </Typography>
                            </Box>
                        </Grid>
                    )}

                    <Grid size={{ xs: 12 }}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            mt={1}
                        >
                            <Typography
                                variant="h6"
                                color="secondary"
                                fontWeight="bold"
                            >
                                ₪{order.total_price}
                            </Typography>
                            <Box>
                                <Tooltip title="عرض التفاصيل">
                                    <IconButton
                                        onClick={() => onView(order.id)}
                                        color="primary"
                                        size="small"
                                    >
                                        <VisibilityIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="حذف الطلب">
                                    <IconButton
                                        onClick={() => onDelete(order.id)}
                                        color="error"
                                        size="small"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default OrderItem;
