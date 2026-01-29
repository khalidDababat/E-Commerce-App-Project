import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    totalPrice: number;
}

const initialState: CartState = {
    items: [],
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );

            if (existingItem) {
                // Product already in cart → increase quantity
                existingItem.quantity += 1;
                state.totalPrice += action.payload.price;
            } else {
                // New product → add to cart
                state.items.push({
                    ...action.payload,
                    quantity: 1,
                });
                state.totalPrice += action.payload.price;
            }
        },
        increaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (!item) return;

            item.quantity += 1;

            state.totalPrice += item.price;
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (!item) return;

            if (item.quantity === 1) return;

            item.quantity -= 1;
            state.totalPrice -= item.price;
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (!item) return;

            state.totalPrice -= item.quantity * item.price;

            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
