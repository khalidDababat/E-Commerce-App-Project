import { configureStore } from '@reduxjs/toolkit';

import productsSlice from './features/productsSlice';
import cartReducer from './features/cartSlice';
import favoriteReducer from './features/favoriteSlice';

export const store = configureStore({
    reducer: {
        products: productsSlice,
        cart: cartReducer,
        favorites: favoriteReducer,
    },
});

export default store;

// Types (very important for TypeScript)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
