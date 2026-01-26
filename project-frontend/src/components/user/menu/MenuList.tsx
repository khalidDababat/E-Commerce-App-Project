import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import logoImage from '../../../assets/images/Logo.png';

import './MenuList.scss';

interface MenuListProps {
    onClose: () => void;
}

const MenuList: React.FC<MenuListProps> = ({ onClose }) => {
    return (
        <div className="menu-overlay" onClick={onClose}>
            <div className="menu-list" onClick={(e) => e.stopPropagation()}>
                <div className="menu-header">
                    <button className="close-btn" onClick={onClose}>
                        <CloseIcon />
                    </button>
                    <div className="menu-logo">
                        <img src={logoImage} alt="Logo" />
                    </div>
                </div>

                <div className="content-list">
                    <Link
                        to="/favorite"
                        className="menu-item"
                        onClick={onClose}
                    >
                        <ArrowBackIosNewIcon className="arrow-icon" />
                        <span className="item-text">المفضلة</span>
                        <FavoriteBorderIcon className="item-icon" />
                    </Link>

                    <Link
                        to="/cartlist"
                        className="menu-item"
                        onClick={onClose}
                    >
                        <ArrowBackIosNewIcon className="arrow-icon" />
                        <span className="item-text">سلة المشتريات</span>
                        <ShoppingCartIcon className="item-icon" />
                    </Link>

                    <Link to="#" className="menu-item" onClick={onClose}>
                        <ArrowBackIosNewIcon className="arrow-icon" />
                        <span className="item-text">English</span>
                        <LanguageIcon className="item-icon" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MenuList;
