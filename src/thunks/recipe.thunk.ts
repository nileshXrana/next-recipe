import { createAsyncThunk } from '@reduxjs/toolkit';
import { recipe, recipeIngrediants, recipeImages } from '@/services/recipe.service';

export const recipeThunk = createAsyncThunk(
    'auth/login',
    async (_, { rejectWithValue }) => {
        try {
            const res = await recipe();
            if (res?.error) {
                return rejectWithValue(res.error);
            }
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const recipeIngrediantsThunk = createAsyncThunk(
    'auth/login',
    async (_, { rejectWithValue }) => {
        try {
            const res = await recipeIngrediants();
            if (res?.error) {
                return rejectWithValue(res.error);
            }
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const recipeImagesThunk = createAsyncThunk(
    'auth/login',
    async (_, { rejectWithValue }) => {
        try {
            const res = await recipeImages();
            if (res?.error) {
                return rejectWithValue(res.error);
            }
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);