import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

interface FavoriteItem {
    id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
}

interface FavoriteState {
    items: FavoriteItem[];
}

const loadState = (): FavoriteState => {
    try {
        const serializedState = localStorage.getItem('favorites');
        if (serializedState === null) {
            return { items: [] };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return { items: [] };
    }
};

const saveState = (state: FavoriteState) => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('favorites', serializedState);
};

const initialState: FavoriteState = loadState();

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<FavoriteItem>) => {
            const index = state.items.findIndex(
                (item) => item.id === action.payload.id
            );
            if (index >= 0) {
                state.items.splice(index, 1);
            } else {
                state.items.push(action.payload);
            }
            saveState(current(state));
        },
        addToFavorites: (state, action: PayloadAction<FavoriteItem>) => {
            const exists = state.items.some(
                (item) => item.id === action.payload.id
            );
            if (!exists) {
                state.items.push(action.payload);
                saveState(current(state));
            }
        },
        removeFromFavorites: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
            saveState(current(state));
        },
    },
});

export const { toggleFavorite, addToFavorites, removeFromFavorites } =
    favoriteSlice.actions;
export default favoriteSlice.reducer;
