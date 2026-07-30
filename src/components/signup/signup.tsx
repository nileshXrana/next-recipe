"use client";

import styles from "./signup.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { signupThunk } from '@/thunks/auth.thunk';
import { AppDispatch } from "@/store";

const signupSchema = z.object({
    name: z.string().min(4, "Name must be at least 4 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export interface SignupFormData {
    name: string;
    email: string;
    password: string;
}

export default function Signup() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const dispatch = useDispatch() as AppDispatch;

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signupSchema)
    });

    const handleSignup = async (user: SignupFormData) => {
        setError("");
        setLoading(true);

        try {

            const res = await dispatch(signupThunk(user)).unwrap();
            router.push("/login");

        } catch (err) {
            setError(err as string);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className={styles.signupContainer} >
            <Box className={styles.signupCard}>
                <Box className={styles.signupHeader}>
                    <h2 className={styles.signupTitle}>Create an account</h2>
                </Box>

                {error && (
                    <Box className={styles.errorBox}>
                        {error}
                    </Box>
                )}

                <form className={styles.signupForm} onSubmit={handleSubmit(handleSignup)}>
                    <Box className={styles.formFields}>
                        <Box className={styles.formField}>
                            <label htmlFor="name" className={styles.formLabel}>
                                Name
                            </label>
                            <TextField
                                id="name"
                                error={!!errors.name}
                                placeholder="full name"
                                helperText={errors?.name?.message}
                                variant="outlined"
                                type="text"
                                disabled={loading}
                                size="small"
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'white',
                                        borderRadius: '6px',
                                    }
                                }}
                                {...register("name")}
                            />
                        </Box>
                        <Box className={styles.formField}>
                            <label htmlFor="email" className={styles.formLabel}>
                                Email address
                            </label>
                            <TextField
                                id="email"
                                error={!!errors.email}
                                placeholder="you@example.com"
                                helperText={errors?.email?.message}
                                variant="outlined"
                                type="email"
                                disabled={loading}
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
                                helperText={errors?.password?.message}
                                variant="outlined"
                                type="password"
                                disabled={loading}
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
                            type="submit"
                            disabled={loading}
                            className={styles.btnSubmit}
                            sx={{ bgcolor: '#4f46e5', color: 'white' }}
                        >
                            {loading ? "Creating account..." : "Sign Up"}
                        </Button>
                    </Box>
                </form>

                <Box className={styles.signupFooter}>
                    Already have an account?{" "}
                    <Link href="/login" className={styles.signupLink}>
                        Log in here
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}