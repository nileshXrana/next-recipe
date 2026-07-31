import axios from "axios";
import { recipeData } from "@/components/file-dialog/file-dialog";

axios.defaults.withCredentials = true;

export const recipe = async (recipeData: recipeData) => {
    try {
        const response = await axios.post("http://localhost:8000/recipe", recipeData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserRecipes = async (params?: { search?: string; page?: number; limit?: number }) => {
    try {
        const response = await axios.get("http://localhost:8000/recipe/my", { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllRecipes = async (params?: { search?: string; page?: number; limit?: number }) => {
    try {
        const response = await axios.get("http://localhost:8000/recipe", { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getMyIngredients = async () => {
    try {
        const response = await axios.get("http://localhost:8000/ingredients");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getRecipesByIngredients = async (ingredients: string[]) => {
    try {
        const response = await axios.get("http://localhost:8000/recipe/filterIngredients", {
            params: { ingredients: ingredients.join(",") },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};