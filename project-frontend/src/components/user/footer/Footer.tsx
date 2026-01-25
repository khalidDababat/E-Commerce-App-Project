import React from 'react';
import styles from './Footer.module.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const cartItems = useSelector((state: any) => state.cart.items);
    const navigate = useNavigate();

    const totalPrice = cartItems.reduce(
        (acc: number, item: any) => acc + item.price * item.quantity,
        0
    );

    const openCartList = () => {
        navigate('/cartlist');
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent} onClick={() => {
                openCartList();
            }}>
                <div
                    className={styles.footerTitle}

                >
                    <div className={styles.quantity}>
                        <span>{cartItems.length}</span>
                    </div>
                    <p>سلة المشتريات</p>
                </div>
                <div className={styles.footerPrice}>
                    <p>
                        <span>₪</span>
                        {totalPrice}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
