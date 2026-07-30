import axios from "axios";

axios.defaults.withCredentials = true;


export const recipe = async () => {
    try {
        const response = await axios.post("http://localhost:8000/recipe",
            {

            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const recipeIngrediants = async () => {
    try {
        const response = await axios.post("http://localhost:8000/recipe/ingrediants",
            {

            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const recipeImages = async () => {
    try {
        const response = await axios.post("http://localhost:8000/recipe/images",
            {

            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};