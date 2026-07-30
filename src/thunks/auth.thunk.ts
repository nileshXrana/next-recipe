import { createAsyncThunk } from '@reduxjs/toolkit';
import {login, signup, logout} from '@/services/auth.service';
import { SignupFormData } from '@/components/signup/signup';
import { LoginFormData } from '@/components/login/login';


export const loginThunk = createAsyncThunk(
    'auth/login',
    async (user: LoginFormData, { rejectWithValue }) => {
        try {
            const res = await login(user);
            if (res?.error) {
                return rejectWithValue(res.error);
            }
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const signupThunk = createAsyncThunk(
    'auth/signup',
    async (user: SignupFormData, { rejectWithValue }) => {
        try {
            const res = await signup(user);
            if (res?.error) {
                return rejectWithValue(res.error);
            }
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const res = await logout();
            if (res?.error) {
                return rejectWithValue(res.error);
            }
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

