import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store/Store';
import { toggleFavorite as toggleFavoriteAction } from '../Store/features/favoriteSlice';
import { addToCart as addToCartAction } from '../Store/features/cartSlice';
import { toast } from 'react-toastify';
import React from 'react';

interface Product {
    id: number | string;
    name: string;
    price: number;
    image: string;
}

export const useProductActions = (product: Product) => {
    const dispatch = useDispatch();
    const isFavorite = useSelector((state: RootState) =>
        state.favorites.items.some(
            (item) => String(item.id) === String(product.id)
        )
    );

    const handleToggleFavorite = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        dispatch(
            toggleFavoriteAction({
                ...product,
                id: String(product.id),
            })
        );
        if (!isFavorite) {
            toast.success('تم الإضافة للمفضلة');
        } else {
            toast.info('تم الإزالة من المفضلة');
        }
    };

    const handleAddToCart = (quantity: number = 1, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        dispatch(
            addToCartAction({
                ...product,
                id: Number(product.id),
                quantity,
            })
        );
        toast.success('تم إضافة المنتج للسلة');
    };

    const getTotalPrice = (quantity: number) =>
        (product.price * quantity).toFixed(2);

    return {
        isFavorite,
        handleToggleFavorite,
        handleAddToCart,
        getTotalPrice,
    };
};
