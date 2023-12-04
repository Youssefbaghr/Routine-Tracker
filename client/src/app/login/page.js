'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../lib/features/auth-slice';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

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
        setError('');

        try {
            const response = await axios.post('/api/login', {
                email,
                password,
            });
            const { token, user } = response.data;

            dispatch(login({ token, user }));

            router.push('/', { scroll: false });
        } catch (error) {
            setError('Invalid credentials. Please try again.');
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
                    <div className='transition-all duration-300 ease-in-out transform hover:scale-105'>
                        <label
                            htmlFor='password'
                            className='block text-gray-700 font-semibold mb-2'
                        >
                            Password
                        </label>

                        <input
                            type='password'
                            id='password'
                            placeholder='Enter your password'
                            value={password}
                            onChange={handlePasswordChange}
                            className='w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out'
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                {error && (
                    <div className='mt-4 text-center'>
                        <p className='text-red-500'>{error}</p>
                    </div>
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
