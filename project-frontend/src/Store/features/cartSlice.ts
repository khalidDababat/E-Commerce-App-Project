import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(
                item => item.id === action.payload.id
            );

            if (existingItem) {
                // Product already in cart → increase quantity
                existingItem.quantity += 1;
            } else {
                // New product → add to cart
                state.items.push({
                    ...action.payload,
                    quantity: 1,
                });
            }
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                item => item.id !== action.payload
            );
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
