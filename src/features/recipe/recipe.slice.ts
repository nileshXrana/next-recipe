import { createSlice } from '@reduxjs/toolkit';
import { recipeThunk, getUserRecipesThunk, getAllRecipesThunk, getMyIngredientsThunk, getRecipesByIngredientsThunk } from '@/thunks/recipe.thunk';

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [] as any[],
        userRecipes: [] as any[],
        total: 0,
        myIngredients: [] as any[],
        userTotal: 0,
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(recipeThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(recipeThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.recipes = [action.payload, ...state.recipes];
                state.userRecipes = [action.payload, ...state.userRecipes];
                state.total += 1;
                state.userTotal += 1;
            })
            .addCase(recipeThunk.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })


            .addCase(getUserRecipesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserRecipesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.userRecipes = action.payload.data;
                state.userTotal = action.payload.total;
            })
            .addCase(getUserRecipesThunk.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })


            .addCase(getAllRecipesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllRecipesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.recipes = action.payload.data;
                state.total = action.payload.total;
            })
            .addCase(getAllRecipesThunk.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })


            .addCase(getMyIngredientsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMyIngredientsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.myIngredients = action.payload;
            })
            .addCase(getMyIngredientsThunk.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })


            .addCase(getRecipesByIngredientsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRecipesByIngredientsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.userRecipes = action.payload;
                console.log("Recipes fetched based on ingredients:", action.payload);
            })
            .addCase(getRecipesByIngredientsThunk.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload
            })

            
    },
});

export default recipeSlice.reducer;