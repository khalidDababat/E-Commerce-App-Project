import { configureStore } from '@reduxjs/toolkit';

import productsSlice from './features/productsSlice';
import cartReducer from './features/cartSlice';

export const store = configureStore({
    reducer: {
        products: productsSlice,
        cart: cartReducer,
    },
});

export default store;

// Types (very important for TypeScript)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
