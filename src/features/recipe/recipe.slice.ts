import { createSlice } from '@reduxjs/toolkit';

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [],
        loading: false,
        error: null,
    },
    reducers: {},
});

export default recipeSlice.reducer;