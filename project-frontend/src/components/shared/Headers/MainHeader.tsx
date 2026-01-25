import React, { useState } from 'react';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MenuIcon from '@mui/icons-material/Menu';

import logoImage from '../../../assets/images/Logo.png';

import './MainHeader.scss';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import MenuList from '../../user/menu/MenuList';

const MainHeader = () => {
    const cartItems = useSelector((state: any) => state.cart.items);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="main-header">
            <div className="cart">
                <div className="icon-cart">
                    <span>{cartItems.length}</span>
                    <Link to="/cartlist">
                        <ProductionQuantityLimitsIcon />
                    </Link>
                </div>
            </div>

            <div className="logo">
                <img src={logoImage} alt="logoImage" />
            </div>

            <div className="menu-icon" onClick={toggleMenu}>
                <MenuIcon />
            </div>

            {isMenuOpen && <MenuList onClose={() => setIsMenuOpen(false)} />}
        </header>
    );
};

export default MainHeader;
