import { createBrowserRouter, redirect } from 'react-router-dom';
import Dashboard from '../components/admin_new/Dashboard/Dashboard';
import Login from '../pages/admin/Login/Login';
import Products from '../components/admin_new/Products/Products';
import CreateProduct from '../components/admin_new/CreateProduct/CreateProduct';
import Layout from '../components/shared/Layout/Layout';
import CategoryManagement from '../components/admin_new/category-management/CategoryManagement';
import MainPage from '../components/admin_new/order/MainPage';
import ViewOrder from '../components/admin_new/order/ViewOrder';

import MainLayout from '../components/shared/Layout/MainLayout';
import { authLoader } from './authLoader';
import AddfeatFood from '../components/admin_new/addfeatfood/addfeatFood';
import CartList from '../components/user/cartlistproduct/CartList';
import FavoriteList from '../components/user/favoriteproducts/FavoriteList';
import NotFoundPage from '../pages/notfoundpages/NotFoundPage';
import ForgotPassword from '../pages/admin/forgotpassword/ForgotPassword';
import ResetPassword from '../pages/admin/resetpassword/ResetPassword';

export const router = createBrowserRouter([
    {
        path: '/',
        loader: () => redirect('/MainLayout'),
    },
    { path: '/MainLayout', element: <MainLayout /> },

    { path: '/favorite', element: <FavoriteList /> },
    { path: '/cartlist', element: <CartList /> },
    { path: '/login', element: <Login /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: '/reset-password', element: <ResetPassword /> },
    { path: "*", element: <NotFoundPage /> },

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
            {
                path: '/order',
                element: <MainPage />,
            },
            {
                path: '/order/:id',
                element: <ViewOrder />,
            },
        ],
    },
]);
