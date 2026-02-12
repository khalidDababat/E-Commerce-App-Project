import React, { Fragment } from 'react';
import { Typography } from '@mui/material';
import ArrowForwardIcon from '../../shared/ArrowForwardIcon/ArrowForwardIcon';
import emptyImage from '../../../assets/images/favoriteempty.jpg';
import './FavoriteList.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store/Store';
import ProductItem from '../ProductItem/ProductItem';

const FavoriteList: React.FC = () => {
    const favorites = useSelector((state: RootState) => state.favorites.items);

    return (
        <div className="favorite-list">
            <div className="favorite-list_header">
                <Typography variant="h6" component="h3">
                    المفضلة
                </Typography>
                <div className="back-btn">
                    <ArrowForwardIcon onClick={() => window.history.back()} />
                </div>
            </div>

            {favorites.length === 0 ? (
                <div className="favorite-list_content">
                    <div className="image-container">
                        <img src={emptyImage} alt="empty" />
                    </div>
                    <div className="empty-text">قائمة المفضلة فارغة</div>
                    <div className="sub-text">
                        لم تقم بإضافة أي منتجات إلى مفضلتك بعد. ابدأ باستكشاف
                        قائمة الطعام الآن!
                    </div>
                    <button
                        className="go-back-btn"
                        onClick={() => window.history.back()}
                    >
                        استكشاف المنتجات
                    </button>
                </div>
            ) : (
                <div className="favorite-items">
                    {favorites.map((product) => (
                        <ProductItem
                            key={product.id}
                            id={Number(product.id)}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                            description={product.description}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoriteList;
