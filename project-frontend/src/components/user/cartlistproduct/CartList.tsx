import React, { useState } from 'react';
import './CartList.scss';
import cartEmpty from '../../../assets/images/cartEmpty.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import CartListHeader from './CartListHeader';
import CartItem from './CartItem';
import DatailsOrder from './DatailsOrder';
import CouponSection from './CouponSection';
import ContactInfo from './ContactInfo';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
} from '../../../Store/features/cartSlice';

const CartList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state: any) => state.cart);
    const [step, setStep] = useState(1); // 1: Cart, 2: Contact Info

    const handleIncrease = (id: number) => {
        dispatch(increaseQuantity(id));
    };

    const handleDecrease = (id: number) => {
        dispatch(decreaseQuantity(id));
    };

    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id));
    };

    const totalPrice =
        cart.items?.reduce(
            (acc: number, item: any) => acc + item.price * item.quantity,
            0
        ) || 0;

    const isCartEmpty = !cart.items || cart.items.length === 0;

    const handleBack = () => {
        if (step === 2) {
            setStep(1);
        } else {
            navigate('/MainLayout');
        }
    };

    return (
        <div className="card-list">
            <CartListHeader onBack={handleBack} />

            {isCartEmpty && step === 1 ? (
                <div className="card-list_content">
                    <img src={cartEmpty} alt="cart-empty" />
                    <h3>لا توجد أصناف بالسلة</h3>
                </div>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {step === 1 ? (
                        <>
                            {cart.items.map((item: any) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onIncrease={handleIncrease}
                                    onDecrease={handleDecrease}
                                    onRemove={handleRemove}
                                />
                            ))}
                            <DatailsOrder total={totalPrice} />
                        </>
                    ) : (
                        <>
                            <ContactInfo />
                            <DatailsOrder total={totalPrice} />
                        </>
                    )}
                </Box>
            )}

            {!isCartEmpty && (
                <div className="cart-actions">
                    {step === 1 ? (
                        <>
                            <Button
                                variant="contained"
                                className="btn-next"
                                onClick={() => setStep(2)}
                            >
                                التالي
                            </Button>
                            <Button
                                variant="outlined"
                                className="btn-add-more"
                                onClick={() => navigate('/MainLayout')}
                            >
                                إضافة منتج آخر
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            fullWidth
                            className="btn-next"
                            startIcon={<FastfoodIcon />}
                            sx={{ py: 1.5, px: 2, fontSize: '1.2rem' }}
                        >
                            إرسال الطلب
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};
export default CartList;
