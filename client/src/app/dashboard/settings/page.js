'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { editUser } from '@/lib/features/auth-slice';

const predefinedImages = [
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    'https://pixabay.com/vectors/user-man-profile-male-face-gui-33638/',
    'https://cdn.pixabay.com/photo/2017/03/01/22/18/avatar-2109804_1280.png',
    'https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png',
    'https://cdn.pixabay.com/photo/2014/03/25/16/54/user-297566_1280.png',
];

export default function Settings() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [selectedProfileImg, setSelectedProfileImg] = useState('');

    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/api/users/${_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const userData = response.data;

                setName(userData.username);
                setEmail(userData.email);
                setSelectedProfileImg(userData.profileImage);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [_id, token]);

    const dispatch = useDispatch();

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSelectProfileImg = (imgUrl) => {
        setSelectedProfileImg(imgUrl);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (password === confirmPassword) {
                const userData = {
                    username: name,
                    password,
                    email,
                    profileImage: selectedProfileImg,
                };

                // Make an API request using Axios to update user information
                const response = await axios.put(
                    `/api/users/edit/${_id}`,
                    userData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Update Redux store with the edited user information
                dispatch(editUser(response.data));

                window.location.href = '/dashboard/profile';

                // Clear the input fields after successful update
                setName('');
                setPassword('');
                setConfirmPassword('');
                setEmail('');
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className='container mx-auto px-4 py-8'
        >
            <h1 className='text-3xl font-bold mb-6 text-center'>Settings</h1>
            <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label
                        htmlFor='name'
                        className='block text-gray-700 font-semibold mb-2'
                    >
                        Change Name
                    </label>
                    <input
                        type='text'
                        id='name'
                        className='w-full rounded-md border-gray-300 focus:outline-none focus:border-blue-500 px-4 py-2'
                        value={name}
                        onChange={handleNameChange}
                        placeholder='Enter new name'
                    />
                </div>
                <div className='mb-4'>
                    <label
                        htmlFor='password'
                        className='block text-gray-700 font-semibold mb-2'
                    >
                        Change Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        className='w-full rounded-md border-gray-300 focus:outline-none focus:border-blue-500 px-4 py-2'
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder='Enter new password'
                    />
                </div>
                <div className='mb-6'>
                    <label
                        htmlFor='confirmPassword'
                        className='block text-gray-700 font-semibold mb-2'
                    >
                        Confirm New Password
                    </label>
                    <input
                        type='password'
                        id='confirmPassword'
                        className='w-full rounded-md border-gray-300 focus:outline-none focus:border-blue-500 px-4 py-2'
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        placeholder='Confirm new password'
                    />
                </div>

                <div className='mb-4'>
                    <label
                        htmlFor='email'
                        className='block text-gray-700 font-semibold mb-2'
                    >
                        Email Address
                    </label>
                    <input
                        type='email'
                        id='email'
                        className='w-full rounded-md border-gray-300 focus:outline-none focus:border-blue-500 px-4 py-2'
                        value={email}
                        onChange={handleEmailChange}
                        placeholder='Enter email address'
                    />
                </div>

                <div className='mb-4'>
                    <label
                        htmlFor='profileImg'
                        className='block text-gray-700 font-semibold mb-2'
                    >
                        Choose Profile Image
                    </label>
                    <div className='flex flex-wrap'>
                        {predefinedImages.map((imgUrl, index) => (
                            <img
                                key={index}
                                src={imgUrl}
                                alt={`Image ${index}`}
                                className={`w-24 h-24 object-cover m-2 border ${
                                    selectedProfileImg === imgUrl
                                        ? 'border-blue-500'
                                        : 'border-gray-300 cursor-pointer'
                                }`}
                                onClick={() => handleSelectProfileImg(imgUrl)}
                            />
                        ))}
                    </div>
                </div>

                <div className='text-center'>
                    <button
                        type='submit'
                        className='py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300'
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </motion.div>
    );
}
