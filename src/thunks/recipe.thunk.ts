import { createAsyncThunk } from '@reduxjs/toolkit';
import { recipe, getUserRecipes, getAllRecipes } from '@/services/recipe.service';
import { recipeData } from '@/components/file-dialog/file-dialog';

export const recipeThunk = createAsyncThunk(
    'recipe/create',
    async (recipeData: recipeData, { rejectWithValue }) => {
        try {
            const res = await recipe(recipeData);
            if (res?.error) {
                return rejectWithValue(res.error);
            }
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getUserRecipesThunk = createAsyncThunk(
    'recipe/getUserRecipes',
    async (params: { search?: string; page?: number; limit?: number } | undefined, { rejectWithValue }) => {
        try {
            const res = await getUserRecipes(params);
            if (res?.error) {
                return rejectWithValue(res.error);
            }
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getAllRecipesThunk = createAsyncThunk(
    'recipe/getAllRecipes',
    async (params: { search?: string; page?: number; limit?: number } | undefined, { rejectWithValue }) => {
        try {
            const res = await getAllRecipes(params);
            if (res?.error) {
                return rejectWithValue(res.error);
            }
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
