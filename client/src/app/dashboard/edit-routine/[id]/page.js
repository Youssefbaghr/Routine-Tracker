'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function EditRoutine({ params }) {
    const { id } = params;
    const [routineTitle, setRoutineTitle] = useState('');
    const [routineDescription, setRoutineDescription] = useState('');
    const token = useSelector((state) => state.token);

    useEffect(() => {
        const fetchRoutine = async () => {
            try {
                const response = await axios.get(`/routines/${id}`);
                const { title, description } = response.data;
                setRoutineTitle(title);
                setRoutineDescription(description);
            } catch (error) {
                console.error('Error fetching routine:', error.response.data);
            }
        };

        fetchRoutine();
    }, [id]);

    const handleTitleChange = (e) => {
        setRoutineTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setRoutineDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedRoutine = {
                title: routineTitle,
                description: routineDescription,
            };

            const response = await axios.put(
                `/routines/edit/${id}`,
                updatedRoutine,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log('Routine updated:', response.data);
            window.location.href = '/dashboard/routines';
        } catch (error) {
            console.error('Error updating routine:', error.response.data);
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
            <h1 className='text-3xl font-bold mb-4 text-center'>
                Edit Routine {routineTitle}
            </h1>
            <form className='max-w-md mx-auto'>
                <div className='mb-4'>
                    <label
                        htmlFor='routineTitle'
                        className='block text-gray-700 font-semibold mb-2'
                    >
                        Routine Title
                    </label>
                    <input
                        type='text'
                        id='routineTitle'
                        className='w-full rounded-md border-gray-300 focus:outline-none focus:border-blue-500 px-4 py-2'
                        value={routineTitle}
                        onChange={handleTitleChange}
                        placeholder='Enter routine title'
                    />
                </div>
                <div className='mb-6'>
                    <label
                        htmlFor='routineDescription'
                        className='block text-gray-700 font-semibold mb-2'
                    >
                        Routine Description
                    </label>
                    <textarea
                        id='routineDescription'
                        className='w-full rounded-md border-gray-300 focus:outline-none focus:border-blue-500 px-4 py-2 h-32 resize-none'
                        value={routineDescription}
                        onChange={handleDescriptionChange}
                        placeholder='Enter routine description'
                    ></textarea>
                </div>
                <div className='text-center'>
                    <button
                        className='py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300'
                        onClick={handleSubmit}
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </motion.div>
    );
}
