import React, { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from '../../admin_new/Sidebar/Sidebar';
import HeaderUser from '../Headers/HeaderUser';

const Layout = () => {
    const location = useLocation();

    const title = useMemo(() => {
        switch (location.pathname) {
            case '/dashboard':
                return 'لوحة تحكم مسؤول النظام';
            case '/products':
                return 'إدارة المنتجات';
            case '/createProduct':
                return 'إضافة منتج جديد';
            case '/orders':
                return 'إدارة الطلبات';
            case '/category-management':
                return 'إدارة الأصناف';
            case '/add-feat-food':
                return 'إضافات الطعام';
            default:
                return 'Restaurant App';
        }
    }, [location.pathname]);

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                    backgroundColor: 'background.default',
                }}
            >
                <HeaderUser title={title} />
                <Box sx={{ p: 2 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
