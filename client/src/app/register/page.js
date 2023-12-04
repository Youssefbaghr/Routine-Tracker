'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Register = () => {
    // State variables
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    // Handle form submission
    const handleRegister = async (e) => {
        e.preventDefault();

        // Clear previous error messages
        setError('');

        // Check if any required field is empty
        if (!name || !email || !password || !age || !gender) {
            setError('Please fill in all the fields');
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
            // Handle any errors during image upload or registration
            console.error('Registration Error:', error);
            setError('Failed to register. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

      return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full sm:w-96 max-w-md'>
                <h1 className='text-3xl font-bold text-center mb-8'>
                    Register
                </h1>
                {error && (
                    <p className='text-red-500 text-center mb-4'>{error}</p>
                )}
<form
                    className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-4'
                    onSubmit={handleRegister}
                >
                    <div className='flex flex-col'>
                        <input
                            type='text'
                            placeholder='Enter your name'
                           className='border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 sm:col-span-2'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <input
                            type='email'
                            placeholder='Enter your email'
className='border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 sm:col-span-2'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <input
                        type='password'
                        placeholder='Enter your password'
className='border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 sm:col-span-2'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type='date'className='border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 sm:col-span-2'
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <select
                        className='border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 col-span-2'
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value=''>Select Gender</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
                    <button
                        type='submit'
                        disabled={isLoading}
                        className={`${
                            isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600'
                        } text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out col-span-2`}
                        style={{
                            transition: 'transform 0.2s ease-in-out',
                        }}
                    >
                        {isLoading ? 'Loading...' : 'Register'}
                    </button>
                    <div className='col-span-2 text-center'>
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
