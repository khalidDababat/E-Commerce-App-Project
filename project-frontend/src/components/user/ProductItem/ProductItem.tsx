import React, { useState } from 'react';
import './ProductItem.scss';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { toast } from 'react-toastify';

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../Store/features/cartSlice';

interface ProductItemProps {
    id: number;
    name: string;
    price: number;
    image?: string;
}

const ProductItem: React.FC<ProductItemProps> = ({
    id,
    name,
    price,
    image,
}) => {
    const [faveriteProducts, setFaveriteProducts] = useState([]);

    const dispatch = useDispatch();

    const storeProductIntoFavorite = () => {
        //    setFaveriteProducts([...faveriteProducts, { name, price, image }]);
        alert('Product added to favorite');
    };

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                id: id,
                name: name,
                price: price,
                image: image || '',
                quantity: 1, // initial value, reducer will handle it
            })
        );
        toast.success('تم إضافة المنتج للسلة');
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

                <button onClick={handleAddToCart}>
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
