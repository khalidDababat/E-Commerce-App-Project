import { createBrowserRouter, redirect } from 'react-router-dom';
import Dashboard from '../components/admin_new/Dashboard/Dashboard';
import Login from '../pages/admin/Login/Login';
import Products from '../components/admin_new/Products/Products';
import CreateProduct from '../components/admin_new/CreateProduct/CreateProduct';
import Layout from '../components/shared/Layout/Layout';
import CategoryManagement from '../components/admin_new/category-management/CategoryManagement';

import MainLayout from '../components/shared/Layout/MainLayout';
import { authLoader } from './authLoader';
import AddfeatFood from '../components/admin_new/addfeatfood/addfeatFood';

export const router = createBrowserRouter([
    {
        path: '/',
        loader: () => redirect('/MainLayout'),
    },
    { path: '/MainLayout', element: <MainLayout /> },
    { path: '/login', element: <Login /> },
    {
        element: <Layout />,
        loader: authLoader, // Check auth for all nested routes
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/products',
                element: <Products />,
            },
            {
                path: '/createProduct',
                element: <CreateProduct />,
            },
            {
                path: '/category-management',
                element: <CategoryManagement />,
            },
            {
                path: '/add-feat-food',
                element: <AddfeatFood />,
            },
        ],
    },
]);
