'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteUser, logout } from '../../../lib/features/auth-slice.js';
import axios from 'axios';
import Collapse from '@mui/material/Collapse';
import { Alert, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Profile = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [showAlert, setShowAlert] = useState(false);

    const token = useSelector((state) => state.token);

    const calculateAgeFromDate = (dateString) => {
        const birthDate = new Date(dateString);
        const currentDate = new Date();

        // Calculate the difference in milliseconds
        const differenceMs = currentDate - birthDate;

        // Convert milliseconds to years
        const ageDate = new Date(differenceMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);

        return age;
    };

    const dateString = user.age;
    const age = calculateAgeFromDate(dateString);

    const handleLogout = () => {
        dispatch(logout());
        window.location.href = '/login';
    };

    const handleDeleteAccount = async () => {
        setShowAlert(true); // Set showAlert to true when the delete button is clicked
    };

    const confirmDeleteAccount = async () => {
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
                <div className='mt-4'>
                    <button
                        onClick={handleLogout}
                        className='block w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded my-2 transition duration-300 ease-in-out'
                    >
                        Logout
                    </button>
                    <button
                        onClick={handleDeleteAccount}
                        className='block w-full py-2 px-4 mb-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded transition duration-300 ease-in-out'
                    >
                        Delete Account
                    </button>

                    <Collapse in={showAlert} className='my-2'>
                        <Alert
                            severity='warning'
                            action={
                                <IconButton
                                    aria-label='close'
                                    color='inherit'
                                    size='small'
                                    onClick={() => {
                                        setShowAlert(false);
                                    }}
                                >
                                    <CloseIcon fontSize='inherit' />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            <div>
                                <p>
                                    Are you sure you want to delete your
                                    account?
                                </p>
                                <div className='mt-4 flex justify-around'>
                                    <Button onClick={() => setShowAlert(false)}>
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={() => confirmDeleteAccount()}
                                        variant='contained'
                                        color='error'
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </Alert>
                    </Collapse>
                    <div className='mt-4 text-center'>
                        <a
                            href='/dashboard/settings'
                            className='text-blue-500 hover:underline'
                        >
                            Go to Settings
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
