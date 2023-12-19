'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Collapse from '@mui/material/Collapse';
import { Alert, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Routines = () => {
    const [routines, setRoutines] = useState([]);
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);

    const [showAlert, setShowAlert] = useState(false);

    console.log(showAlert);

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

    /*     const handleDelete = async () => {
        setShowAlert(true); // Set showAlert to true when the delete button is clicked
    };

    const handleConfimDelete = async (routineId) => {
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
    }; */

    const [deletingRoutineId, setDeletingRoutineId] = useState(null);

    const handleDelete = (routineId) => {
        setDeletingRoutineId(routineId);
    };

    const handleConfirmDelete = async (routineId) => {
        try {
            const response = await axios.delete(
                `/routines/delete/${routineId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setDeletingRoutineId(null); // Reset deletingRoutineId after successful deletion
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
                        <div>
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
                                        onClick={() =>
                                            handleDelete(routine._id)
                                        }
                                        className='py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300'
                                    >
                                        Delete
                                    </btn>
                                </div>
                            </div>
                            <Collapse
                                in={deletingRoutineId === routine._id}
                                className='my-2'
                            >
                                <Alert
                                    severity='warning'
                                    action={
                                        <IconButton
                                            aria-label='close'
                                            color='inherit'
                                            size='small'
                                            onClick={() =>
                                                setDeletingRoutineId(null)
                                            }
                                        >
                                            <CloseIcon fontSize='inherit' />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                >
                                    {/* Confirmation message and buttons */}
                                    <div>
                                        <p>
                                            Are you sure you want to delete your
                                            routine {routine.title}?
                                        </p>
                                        <div className='mt-4 flex justify-around'>
                                            <Button
                                                onClick={() =>
                                                    setDeletingRoutineId(null)
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    handleConfirmDelete(
                                                        routine._id
                                                    )
                                                }
                                                variant='contained'
                                                color='error'
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </Alert>
                            </Collapse>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Routines;
