'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../lib/features/auth-slice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ErrorHandler from '@/Components/ErrorHandler';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState('');

    const clearError = () => {
        setErrorMessage('');
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const dispatch = useDispatch();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission

        setLoading(true);
        setErrorMessage('');

        try {
            const response = await axios.post('/api/login', {
                email,
                password,
            });
            const { token, user } = response.data;

            dispatch(login({ token, user }));

            router.push('/', { scroll: false });
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                const { status, data } = error.response;
                if (status === 400) {
                    setErrorMessage(data.error);
                } else if (status === 401) {
                    setErrorMessage(data.error);
                } else {
                    setErrorMessage('An error occurred. Please try again.');
                }
            } else if (error.request) {
                // The request was made but no response was received
                setErrorMessage(
                    'No response received from the server. Please try again.'
                );
            } else {
                // Something happened in setting up the request
                setErrorMessage('An error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full sm:w-96'>
                <h1 className='text-3xl font-bold text-center mb-8'>Login</h1>
                <form className='space-y-4' onSubmit={handleLogin}>
                    <div className='transition-all duration-300 ease-in-out transform hover:scale-105'>
                        <label
                            htmlFor='email'
                            className='block text-gray-700 font-semibold mb-2'
                        >
                            Email
                        </label>
                        <input
                            type='email'
                            id='email'
                            placeholder='Enter your email'
                            value={email}
                            onChange={handleEmailChange}
                            className='w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                        />
                    </div>

                    <div className='md:col-span-2 relative'>
                        <label
                            htmlFor='password'
                            className='block text-gray-700 font-semibold mb-2'
                        >
                            Password
                        </label>
                        <div className='flex items-center py-2 px-3'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Enter your password'
                                className='w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <button
                                type='button'
                                className='flex items-center justify-center h-full px-3 focus:outline-none'
                                onClick={handleTogglePassword}
                            >
                                {showPassword ? (
                                    <VisibilityOff className='h-5 w-5 text-gray-500' />
                                ) : (
                                    <Visibility className='h-5 w-5 text-gray-500' />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out'
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {errorMessage && (
                    <ErrorHandler
                        errorMessage={errorMessage}
                        clearError={clearError}
                    />
                )}

                <div className='mt-4 text-center'>
                    <p className='text-gray-700'>
                        Don't have an account?{' '}
                        <a
                            href='/register'
                            className='text-blue-500 hover:underline'
                            s
                        >
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
