import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    description?: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    totalPrice: number;
}

const loadState = (): CartState => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) {
            return { items: [], totalPrice: 0 };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return { items: [], totalPrice: 0 };
    }
};

const saveState = (state: CartState) => {

    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);

};

const initialState: CartState = loadState();

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
                existingItem.quantity += action.payload.quantity;
                state.totalPrice +=
                    action.payload.price * action.payload.quantity;
            } else {
                // New product → add to cart
                state.items.push({
                    ...action.payload,
                });
                state.totalPrice +=
                    action.payload.price * action.payload.quantity;
            }
            saveState(state);
        },
        increaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (!item) return;

            item.quantity += 1;

            state.totalPrice += item.price;
            saveState(state);
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (!item) return;

            if (item.quantity === 1) return;

            item.quantity -= 1;
            state.totalPrice -= item.price;
            saveState(state);
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (!item) return;

            state.totalPrice -= item.quantity * item.price;

            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
            saveState(state);
        },
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
            saveState(state);
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
