'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Alert, AlertTitle } from '@mui/material';

const Home = () => {
    const user = useSelector((state) => state.user);
    const [subscribeEmail, setSubscribeEmail] = useState('');
    const [subscribeAlertOpen, setSubscribeAlertOpen] = useState(false);
    const [subscribeAlertProps, setSubscribeAlertProps] = useState({
        message: '',
        severity: 'success',
    });

    const handleCloseAlert = () => {
        setSubscribeAlertOpen(false);
    };

    const handleSubscribe = async (event) => {
        event.preventDefault();
        setSubscribeAlertProps(false);

        // Perform a check for a valid email format (you can use a regex or any validation library)
        const isValidEmail = /\S+@\S+\.\S+/.test(subscribeEmail);
        if (!isValidEmail) {
            setSubscribeAlertProps({
                message: 'Please enter a valid email address',
                severity: 'error',
            });
            setSubscribeAlertOpen(true);
            return;
        } else {
            // Simulating an API call to a backend
            try {
                const response = await axios.post('/api/subscribe', {
                    email: subscribeEmail,
                });

                setSubscribeEmail('');
                setSubscribeAlertProps({
                    message: response.data.message || 'Subscription successful',
                    severity: 'success',
                });
                setSubscribeAlertOpen(true);
                setTimeout(() => {
                    setSubscribeAlertOpen(false);
                }, 3000);
            } catch (error) {
                if (error.response) {
                    setSubscribeAlertProps({
                        message:
                            error.response.data.error || 'Subscription failed',
                        severity: 'error',
                    });
                    setSubscribeAlertOpen(true);
                } else {
                    setSubscribeAlertProps({
                        message: 'Subscription failed',
                        severity: 'error',
                    });
                    setSubscribeAlertOpen(true);
                }
            }
        }
    };

    useEffect(() => {
        let timeout;
        if (subscribeAlertOpen) {
            timeout = setTimeout(() => {
                setSubscribeAlertOpen(false);
            }, 3000);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [subscribeAlertOpen]);

    const cardVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    };

    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='text-center'>
                <h1 className='text-4xl md:text-6xl font-bold text-gray-800 mb-6'>
                    Welcome to your Fitness Planner
                </h1>
                <p className='text-lg md:text-xl text-gray-600 mb-8'>
                    Start planning your workouts and routines efficiently!
                </p>
                <motion.div
                    className='flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4'
                    initial='hidden'
                    animate='visible'
                    variants={cardVariants}
                >
                    {Object.keys(user).length !== 0 ? (
                        <>
                            <Link
                                className='bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out block md:inline-block'
                                href='/dashboard/routines'
                            >
                                Manage Routines
                            </Link>
                            <Link
                                className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out block md:inline-block'
                                href='/dashboard/create-routine'
                            >
                                Create Routine
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out block md:inline-block'
                                href='/register'
                            >
                                Register
                            </Link>
                            <Link
                                className='bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out block md:inline-block'
                                href='/login'
                            >
                                Login
                            </Link>
                        </>
                    )}
                </motion.div>
            </div>

            <section className='mt-12 max-w-3xl mx-auto'>
                <h2 className='text-3xl font-semibold text-gray-800 mb-4'>
                    What Our Users Say
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <motion.div
                        className='bg-white rounded-lg p-6 shadow-md'
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <p className='text-gray-700 mb-4'>
                            "This app helped me stay consistent with my
                            workouts. Highly recommended!"
                        </p>
                        <p className='text-gray-600'>
                            - Emily, Fitness Enthusiast
                        </p>
                    </motion.div>
                    <motion.div
                        className='bg-white rounded-lg p-6 shadow-md'
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <p className='text-gray-700 mb-4'>
                            "Simple and effective! It's like having a personal
                            trainer in my pocket."
                        </p>
                        <p className='text-gray-600'>- Alex, Gym Goer</p>
                    </motion.div>
                </div>
            </section>

            <section className='mt-12 max-w-3xl mx-auto'>
                <h2 className='text-3xl font-semibold text-gray-800 mb-4'>
                    Subscribe for Updates
                </h2>
                <p className='text-gray-600 mb-4'>
                    Subscribe to our newsletter and stay updated with the latest
                    fitness tips, news, and features!
                </p>
                <motion.form
                    onSubmit={handleSubscribe}
                    className='flex items-center justify-center'
                    initial='hidden'
                    animate='visible'
                    variants={formVariants}
                >
                    <input
                        type='email'
                        value={subscribeEmail}
                        onChange={(e) => setSubscribeEmail(e.target.value)}
                        placeholder='Enter your email...'
                        className='border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-500 flex-1'
                    />
                    <button
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-r-lg shadow-md transition duration-300 ease-in-out'
                    >
                        Subscribe
                    </button>
                </motion.form>
                {subscribeAlertOpen === true && (
                    <Alert
                        open={subscribeAlertOpen}
                        onClose={handleCloseAlert}
                        severity={subscribeAlertProps.severity}
                    >
                        <AlertTitle>
                            {subscribeAlertProps.severity?.toUpperCase()}
                        </AlertTitle>
                        {subscribeAlertProps.message}
                    </Alert>
                )}
            </section>
        </div>
    );
};

export default Home;
