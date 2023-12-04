'use client';

import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteUser, logout } from '../../../lib/features/auth-slice.js';
import axios from 'axios';

const Profile = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const token = useSelector((state) => state.token);

    const [showOptions, setShowOptions] = useState(false);

    function calculateAgeFromDate(dateString) {
        const birthDate = new Date(dateString);
        const currentDate = new Date();

        // Calculate the difference in milliseconds
        const differenceMs = currentDate - birthDate;

        // Convert milliseconds to years
        const ageDate = new Date(differenceMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);

        return age;
    }

    // Example usage:
    const dateString = user.age;
    const age = calculateAgeFromDate(dateString);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleLogout = () => {
        dispatch(logout());
        window.location.href = '/login';
    };

    const handleDeleteAccount = async () => {
        try {
            // Make a DELETE request to the API endpoint passing the user ID
            await axios.delete(`/api/users/delete/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Once the API call is successful, dispatch the deleteUser action
            dispatch(deleteUser());

            // Redirect to the homepage or desired location
            window.location.href = '/';
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4'>
                <div className='text-center mb-6'>
                    <Image
                        src={user.profileImage}
                        alt='Profile'
                        width={150}
                        height={150}
                        className='rounded-full mx-auto mb-4'
                    />
                    <h2 className='text-xl font-semibold'>{user.username}</h2>
                    <p className='text-gray-600'>{user.email}</p>
                </div>
                <div className='mb-6'>
                    <p className='text-gray-700'>
                        <span className='font-semibold'>Gender:</span>{' '}
                        {user.gender}
                    </p>
                    <p className='text-gray-700'>
                        <span className='font-semibold'>Age:</span> {age}
                    </p>
                </div>
                <div className='flex justify-center'>
                    <button
                        onClick={toggleOptions}
                        className='py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded'
                    >
                        Show Options
                    </button>
                </div>
                <CSSTransition
                    in={showOptions}
                    timeout={300}
                    classNames='options'
                    unmountOnExit
                >
                    <div className='mt-4'>
                        <button
                            onClick={handleLogout}
                            className='block w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded my-2 transition duration-300 ease-in-out'
                        >
                            Logout
                        </button>
                        <button
                            onClick={handleDeleteAccount}
                            className='block w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded transition duration-300 ease-in-out'
                        >
                            Delete Account
                        </button>
                        <div className='mt-4 text-center'>
                            <a
                                href='/dashboard/settings'
                                className='text-blue-500 hover:underline'
                            >
                                Go to Settings
                            </a>
                        </div>
                    </div>
                </CSSTransition>
            </div>
        </div>
    );
};

export default Profile;
