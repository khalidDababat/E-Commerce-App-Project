import React from 'react';
import './ProductItem.scss';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { toast } from 'react-toastify';

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { RootState } from '../../../Store/Store';
import ProductDetails from '../productdetails/ProductDetails';
import { useProductActions } from '../../../hooks/useProductActions';

interface ProductItemProps {
    id: number;
    name: string;
    price: number;
    image?: string;
    description?: string;
}

const ProductItem: React.FC<ProductItemProps> = ({
    id,
    name,
    price,
    image,
    description,
}) => {
    const { isFavorite, handleToggleFavorite, handleAddToCart } =
        useProductActions({
            id,
            name,
            price,
            image: image || '',
            description,
        });

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <>
            <div className="Product-Item" onClick={handleOpenModal}>
                <div className="product-details">
                    <div className="title">
                        <h5>{name}</h5>
                        <p onClick={handleToggleFavorite}>
                            {isFavorite ? (
                                <FavoriteIcon sx={{ color: '#ff5252' }} />
                            ) : (
                                <FavoriteBorderIcon />
                            )}
                        </p>
                    </div>
                    <p>
                        <span>₪</span>
                        {price}
                    </p>

                    <button onClick={(e) => handleAddToCart(1, e)}>
                        أضف للسلة{' '}
                        <span>
                            <ShoppingBasketIcon />
                        </span>
                    </button>
                </div>
                <div className="product-image">
                    <img
                        src={`${process.env.REACT_APP_BACKEND_URL}${image}`}
                        alt={name}
                    />
                </div>
            </div>
            <ProductDetails
                open={isModalOpen}
                onClose={handleCloseModal}
                id={id}
                name={name}
                price={price}
                image={image}
                description={description}
            />
        </>
    );
};

export default ProductItem;
