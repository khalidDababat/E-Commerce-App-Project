import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OrderState {
    method: 'delivery' | 'pickup' | 'restaurant'; // pickup = استلم بنفسك
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    customer_area: string;
    note: string;
}

const initialState: OrderState = {
    method: 'restaurant',
    customer_name: '',
    customer_phone: '',
    customer_address: '',
    customer_area: '',
    note: '',
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderMethod: (
            state,
            action: PayloadAction<'delivery' | 'pickup' | 'restaurant'>
        ) => {
            state.method = action.payload;
        },
        setCustomerName: (state, action: PayloadAction<string>) => {
            state.customer_name = action.payload;
        },
        setCustomerPhone: (state, action: PayloadAction<string>) => {
            state.customer_phone = action.payload;
        },
        setCustomerAddress: (state, action: PayloadAction<string>) => {
            state.customer_address = action.payload;
        },
        setCustomerArea: (state, action: PayloadAction<string>) => {
            state.customer_area = action.payload;
        },
        setOrderNote: (state, action: PayloadAction<string>) => {
            state.note = action.payload;
        },
        resetOrderState: () => initialState,
    },
});

export const {
    setOrderMethod,
    setCustomerName,
    setCustomerPhone,
    setCustomerAddress,
    setCustomerArea,
    setOrderNote,
    resetOrderState,
} = orderSlice.actions;

export default orderSlice.reducer;
