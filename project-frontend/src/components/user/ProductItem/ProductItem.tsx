import React, { useState } from 'react';
import './ProductItem.scss';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

interface ProductItemProps {
    name: string;
    price: number;
    image?: string;
}

const ProductItem: React.FC<ProductItemProps> = ({ name, price, image }) => {
    const [faveriteProducts, setFaveriteProducts] = useState([]);
    const storeProductIntoFavorite = () => {
        //    setFaveriteProducts([...faveriteProducts, { name, price, image }]);
        alert('Product added to favorite');
    };

    return (
        <div className="Product-Item">
            <div className="product-details">
                <div className="title">
                    <h5>{name}</h5>
                    <p onClick={() => storeProductIntoFavorite()}>
                        <FavoriteBorderIcon />
                    </p>
                </div>
                <p>
                    <span>₪</span>
                    {price}
                </p>

                <button>
                    أضف للسلة{' '}
                    <span>
                        <ShoppingBasketIcon />
                    </span>
                </button>
            </div>
            <div className="product-image" onClick={() => alert('HI')}>
                <img
                    src={`${process.env.REACT_APP_BACKEND_UR}${image}`}
                    alt="not Found"
                />
            </div>
        </div>
    );
};

export default ProductItem;
