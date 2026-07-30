"use client";

import styles from "./login.module.css";
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { loginThunk } from '@/thunks/auth.thunk';
import { useDispatch } from 'react-redux';
import { AppDispatch } from "@/store";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export interface LoginFormData {
    email: string;
    password: string;
}

export default function Login() {

    const [error, setError] = useState("");
    const router = useRouter();
    const dispatch = useDispatch() as AppDispatch;

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const handleSignIn = async (user: LoginFormData) => {
        setError("");

        try {
            const res = await dispatch(loginThunk(user)).unwrap();
            router.push("/dashboard");
        } catch (err) {
            setError(err as string);
        }

    };

    return (
        <Box className={styles.loginContainer}>
            <Box className={styles.loginCard}>
                <Box className={styles.loginHeader}>
                    <Typography variant="h6" className={styles.loginTitle}>Welcome Back</Typography>
                    <Typography className={styles.loginSubtitle}>Please sign in to your account</Typography>
                </Box>

                <form className={styles.loginForm} onSubmit={handleSubmit(handleSignIn)}>
                    <Box className={styles.formFields}>
                        <Box className={styles.formField}>
                            <label htmlFor="email" className={styles.formLabel}>
                                Email Address
                            </label>
                            <TextField
                                id="email"
                                error={!!errors.email}
                                placeholder="Email"
                                helperText={errors?.email?.message?.toString()}
                                variant="outlined"
                                type="email"
                                size="small"
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'white',
                                        borderRadius: '6px',
                                    }
                                }}
                                {...register("email")}
                            />
                        </Box>

                        <Box className={styles.formField}>
                            <label htmlFor="password" className={styles.formLabel}>
                                Password
                            </label>
                            <TextField
                                id="password"
                                error={!!errors.password}
                                placeholder="••••••••"
                                helperText={errors?.password?.message?.toString()}
                                variant="outlined"
                                type="password"
                                size="small"
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'white',
                                        borderRadius: '6px',
                                    }
                                }}
                                {...register("password")}
                            />
                        </Box>
                    </Box>

                    <Box className={styles.btnContainer}>
                        <Button
                            className={styles.btnSubmit}
                            type="submit"
                            sx={{ bgcolor: '#4f46e5', color: 'white' }}
                        >
                            Sign In
                        </Button>

                        <Box className={styles.divider}>
                            <Typography className={styles.dividerText}>or</Typography>
                        </Box>


                    </Box>
                </form>

                <Box className={styles.loginFooter}>
                    {"Don't have an account? "}
                    <Link href="/signup" className={styles.loginLink} >
                        Sign up here
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}
