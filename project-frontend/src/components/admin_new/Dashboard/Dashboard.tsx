import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { getDashboardData, DashboardData } from '../../api/dashboard';

const Dashboard = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const stats = [
        {
            title: 'عدد المنتجات',
            value: `${data?.products_count || 0}`,
            icon: <AttachMoneyIcon fontSize="large" />,
            color: '#4caf50',
        },

        {
            title: 'إجمالي الطلبات',
            value: `${data?.orders_count || 0}`,
            icon: <ShoppingCartIcon fontSize="large" />,
            color: '#2196f3',
        },
        {
            title: 'عدد العملاء',
            value: `${data?.orders_count || 0}`,
            icon: <PeopleIcon fontSize="large" />,
            color: '#ff9800',
        },
    ];

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const data = await getDashboardData();
                if (data) {
                    setData(data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <Box>
            <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{ mb: 4 }}
            >
                لوحة التحكم
            </Typography>
            <Grid container spacing={3}>
                {stats.map((stat, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <Paper
                            elevation={2}
                            sx={{
                                p: 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                height: '100%',
                                borderRadius: 2,
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    {stat.title}
                                </Typography>
                                <Typography variant="h5" fontWeight="bold">
                                    {stat.value}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: `${stat.color}20`,
                                    color: stat.color,
                                    p: 1.5,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {stat.icon}
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 4 }}>
                <Paper
                    elevation={2}
                    sx={{ p: 3, borderRadius: 2, minHeight: 400 }}
                >
                    <Typography variant="h6" gutterBottom>
                        النشاط
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        لا يوجد نشاط لعرضه حاليًا.
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
};

export default Dashboard;
