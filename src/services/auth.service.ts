import axios from "axios";
import { LoginFormData } from "@/components/login/login";
import { SignupFormData } from "@/components/signup/signup";

axios.defaults.withCredentials = true;

export const login = async (user: LoginFormData) => {
    try {
        const response = await axios.post("http://localhost:8000/auth/login",
            {
                email: user.email,
                password: user.password
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const signup = async (user: SignupFormData) => {
    try {
        const response = await axios.post("http://localhost:8000/auth/signup",
            {
                name: user.name,
                email: user.email,
                password: user.password
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await axios.post("http://localhost:8000/auth/logout");
        return response.data;
    } catch (error) {
        throw error;
    }
};
