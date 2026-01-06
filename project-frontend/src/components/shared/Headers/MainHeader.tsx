import React from 'react';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MenuIcon from '@mui/icons-material/Menu';

import logoImage from '../../../assets/images/Logo.png';

import './Header.scss';
import { Link } from 'react-router-dom';
const MainHeader = () => {
    return (
        <header className="main-header">
            <div className="cart">
                <div className="icon-cart">
                    <span>0</span>
                    <Link to="\">
                        <ProductionQuantityLimitsIcon />
                    </Link>
                </div>

                <div className="icon-login">
                    <Link to="\">
                        <PermIdentityIcon />
                    </Link>
                </div>
            </div>

            <div className="logo">
                <img src={logoImage} alt="logoImage" />
            </div>

            <div className="menu-icon">
                <Link to="\">
                    <MenuIcon />
                </Link>
            </div>
        </header>
    );
};

export default MainHeader;
