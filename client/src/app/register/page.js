'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ErrorHandler from '@/Components/ErrorHandler';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Register = () => {
    // State variables
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');

    const clearError = () => {
        setErrorMessage('');
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    // Handle form submission
    const handleRegister = async (e) => {
        e.preventDefault();

        // Clear previous error messages
        setErrorMessage('');

        // Check if any required field is empty
        if (!name || !email || !password || !age || !gender) {
            setErrorMessage('Please fill in all the fields');
            return;
        }

        setIsLoading(true);
        try {
            // Prepare user data for registration
            const userData = {
                username: name,
                email,
                password,
                age,
                gender,
            };

            // Register user by sending data to the backend
            const registrationResponse = await axios.post(
                '/api/register',
                userData
            );

            // Redirect to login page after successful registration
            router.push('/login', { scroll: false });
        } catch (error) {
            setIsLoading(false);
            if (error.response) {
                // The request was made and the server responded with a status code
                const { status, data } = error.response;
                if (status === 400 || status === 401) {
                    setErrorMessage(
                        data.error || data.message || 'Registration failed'
                    );
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
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full sm:w-96 max-w-md'>
                <h1 className='text-3xl font-bold text-center mb-8'>
                    Register
                </h1>
                {errorMessage && (
                    <ErrorHandler
                        errorMessage={errorMessage}
                        clearError={clearError}
                    />
                )}
                <form
                    className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-4'
                    onSubmit={handleRegister}
                >
                    <div className='md:col-span-1'>
                        <input
                            type='text'
                            placeholder='Enter your name'
                            className='border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 w-full'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='md:col-span-1'>
                        <input
                            type='email'
                            placeholder='Enter your email'
                            className='border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 w-full'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='md:col-span-2 relative'>
                        <div className='flex items-center'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Enter your password'
                                className='border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 w-full'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                    <div className='md:col-span-2'>
                        <input
                            type='date'
                            className='border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 w-full'
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className='md:col-span-2'>
                        <select
                            className='border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 w-full'
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value=''>Select Gender</option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>
                    </div>
                    <div className='md:col-span-2'>
                        <button
                            type='submit'
                            disabled={isLoading}
                            className={`${
                                isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600'
                            } text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out w-full`}
                            style={{
                                transition: 'transform 0.2s ease-in-out',
                            }}
                        >
                            {isLoading ? 'Loading...' : 'Register'}
                        </button>
                    </div>
                    <div className='md:col-span-2 text-center'>
                        <p className='text-gray-700'>
                            Have an account?{' '}
                            <a
                                href='/login'
                                className='text-blue-500 hover:underline'
                            >
                                Login
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
