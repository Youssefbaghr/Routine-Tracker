'use client';

import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CreateRoutine = () => {
    const [routine, setRoutine] = useState({
        title: '',
        description: '',
        tasks: [''],
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (index, value) => {
        const updatedTasks = [...routine.tasks];
        updatedTasks[index] = value;
        setRoutine({ ...routine, tasks: updatedTasks });
    };

    const addTask = () => {
        const updatedTasks = [...routine.tasks, ''];
        setRoutine({ ...routine, tasks: updatedTasks });
    };

    const removeTask = (index) => {
        const updatedTasks = [...routine.tasks];
        updatedTasks.splice(index, 1);
        setRoutine({ ...routine, tasks: updatedTasks });
    };

    const validateInputs = () => {
        const errors = {};

        if (!routine.title.trim()) {
            errors.title = 'Title is required';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const token = useSelector((state) => state.token);
    const userId = useSelector((state) => state.user._id);

    const handleSubmit = async () => {
        const isValid = validateInputs();

        if (isValid) {
            try {
                const updatedRoutine = { ...routine, userId };
                const response = await axios.post(
                    '/routines/createRoutine',
                    updatedRoutine,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                window.location.href = '/dashboard/routines';
            } catch (error) {
                console.error('Error creating routine:', error.response.data);
            }
        } else {
            console.log('Please fill in all required fields.');
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='max-w-md w-full mx-4'>
                <h1 className='text-3xl font-bold text-center mb-6'>
                    Create Routine
                </h1>
                <div className='bg-white rounded-md shadow-md p-6'>
                    <label className='block mb-4'>
                        Routine Title
                        <input
                            type='text'
                            className={`border border-gray-300 rounded-md w-full px-3 py-2 mt-1 ${
                                errors.title ? 'border-red-500' : ''
                            }`}
                            value={routine.title}
                            onChange={(e) =>
                                setRoutine({
                                    ...routine,
                                    title: e.target.value,
                                })
                            }
                        />
                        {errors.title && (
                            <p className='text-red-500 text-xs mt-1'>
                                {errors.title}
                            </p>
                        )}
                    </label>
                    <label className='block mb-4'>
                        Description
                        <textarea
                            className='border border-gray-300 rounded-md w-full px-3 py-2 mt-1'
                            value={routine.description}
                            onChange={(e) =>
                                setRoutine({
                                    ...routine,
                                    description: e.target.value,
                                })
                            }
                        ></textarea>
                    </label>
                    <label className='block mb-4'>
                        Tasks
                        {routine.tasks.map((task, index) => (
                            <div key={index} className='flex mb-2'>
                                <input
                                    type='text'
                                    className='border border-gray-300 rounded-md w-full px-3 py-2 mt-1 mr-2'
                                    value={task}
                                    onChange={(e) =>
                                        handleInputChange(index, e.target.value)
                                    }
                                />
                                {index !== routine.tasks.length - 1 && (
                                    <button
                                        className='bg-red-500 text-white px-3 py-1 rounded-md'
                                        onClick={() => removeTask(index)}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                        {routine.tasks[routine.tasks.length - 1] && (
                            <button
                                className='bg-green-500 text-white px-3 py-1 rounded-md'
                                onClick={addTask}
                            >
                                Add More Tasks
                            </button>
                        )}
                    </label>
                    <button
                        className='bg-blue-500 text-white px-4 py-2 rounded-md mt-4'
                        onClick={handleSubmit}
                    >
                        Create Routine
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateRoutine;
