'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Routines = () => {
    const [routines, setRoutines] = useState([]);
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const fetchRoutines = async () => {
            try {
                const response = await axios.get('/routines', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setRoutines(response.data.routines);
            } catch (error) {
                console.error('Error fetching routines:', error);
            }
        };

        fetchRoutines();
    }, []);

    const handleDelete = async (routineId) => {
        try {
            const response = await axios.delete(
                `/routines/delete/${routineId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            location.reload();
        } catch (error) {
            console.error('Error deleting routine:', error.response.data);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='container max-w-3xl mx-auto px-4'>
                <h1 className='text-3xl font-bold text-center mb-6'>
                    Routines
                </h1>
                <div className='flex  mt-6 mb-5'>
                    <Link href='/dashboard/create-routine'>
                        <button className='flex items-center py-2 px-4 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition duration-300'>
                            <span className='mr-2'>+</span> Create Routine
                        </button>
                    </Link>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2 mt-2'>
                    {routines.map((routine) => (
                        <div
                            key={routine._id}
                            className='bg-white rounded-md shadow-md p-6 transition-transform duration-300 transform hover:scale-105'
                        >
                            <h2 className='text-xl font-semibold mb-2'>
                                {routine.title}
                            </h2>
                            <p className='text-gray-600 mb-4'>
                                {routine.description}
                            </p>
                            <ul className='list-disc pl-5'>
                                {routine.tasks.map((task, index) => (
                                    <li key={index}>{task}</li>
                                ))}
                            </ul>
                            <div className='flex justify-end mt-4'>
                                <a
                                    href={`/dashboard/edit-routine/${routine._id}`}
                                    className='py-2 px-4 mr-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300'
                                >
                                    Edit
                                </a>
                                <btn
                                    onClick={() => {
                                        handleDelete(routine._id);
                                    }}
                                    className='py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300'
                                >
                                    Delete
                                </btn>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Routines;
