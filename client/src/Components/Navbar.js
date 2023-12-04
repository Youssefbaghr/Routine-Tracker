'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const user = useSelector((state) => state.user);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const closeNavbar = () => {
        setIsOpen(false);
    };

    const isActive = (path) => {
        return router.pathname === path ? 'bg-gray-900 text-white' : '';
    };

    return (
        <nav className='bg-gray-800 shadow-lg'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    <div className='flex-shrink-0'>
                        <Link href='/' className='text-white text-lg font-bold'>
                            Fitness Planner
                        </Link>
                    </div>
                    <div className='block sm:hidden'>
                        <button
                            onClick={toggleNavbar}
                            className='text-white hover:text-gray-300 focus:outline-none focus:text-gray-300'
                        >
                            <svg
                                className='h-6 w-6 fill-current'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                            >
                                {isOpen ? (
                                    <path
                                        fillRule='evenodd'
                                        clipRule='evenodd'
                                        d='M4 6h16v2H4V6zm0 5h16v2H4v-2zm16 4H4v2h16v-2z'
                                    />
                                ) : (
                                    <path
                                        fillRule='evenodd'
                                        clipRule='evenodd'
                                        d='M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z'
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                    <div className='hidden sm:block'>
                        {Object.keys(user).length !== 0 ? (
                            <div className='flex space-x-4'>
                                <Link
                                    href='/dashboard/profile'
                                    className={`text-white px-3 py-2 rounded-md font-medium transition duration-300 ease-in-out ${isActive(
                                        '/dashboard/profile'
                                    )}`}
                                    onClick={closeNavbar}
                                >
                                    Profile
                                </Link>
                                <Link
                                    href='/dashboard/routines'
                                    className={`text-white px-3 py-2 rounded-md font-medium transition duration-300 ease-in-out ${isActive(
                                        '/dashboard/routines'
                                    )}`}
                                    onClick={closeNavbar}
                                >
                                    Routines
                                </Link>
                            </div>
                        ) : (
                            <div className='flex space-x-4'>
                                <Link
                                    href='/login'
                                    className={`text-white px-3 py-2 rounded-md font-medium transition duration-300 ease-in-out ${isActive(
                                        '/login'
                                    )}`}
                                    onClick={closeNavbar}
                                >
                                    Login
                                </Link>
                                <Link
                                    href='/register'
                                    className={`text-white px-3 py-2 rounded-md font-medium transition duration-300 ease-in-out ${isActive(
                                        '/register'
                                    )}`}
                                    onClick={closeNavbar}
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className='sm:hidden'>
                    <div className='px-2 pt-2 pb-3 space-y-1'>
                        {user ? (
                            <>
                                <Link
                                    href='/dashboard/profile'
                                    className={`text-white block px-3 py-2 rounded-md font-medium hover:bg-gray-700 transition duration-300 ease-in-out ${isActive(
                                        '/dashboard/profile'
                                    )}`}
                                    onClick={closeNavbar}
                                >
                                    Profile
                                </Link>
                                <Link
                                    href='/dashboard/routines'
                                    className={`text-white block px-3 py-2 rounded-md font-medium hover:bg-gray-700 transition duration-300 ease-in-out ${isActive(
                                        '/dashboard/routines'
                                    )}`}
                                    onClick={closeNavbar}
                                >
                                    Routines
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href='/login'
                                    className={`text-white block px-3 py-2 rounded-md font-medium hover:bg-gray-700 transition duration-300 ease-in-out ${isActive(
                                        '/login'
                                    )}`}
                                    onClick={closeNavbar}
                                >
                                    Login
                                </Link>
                                <Link
                                    href='/register'
                                    className={`text-white block px-3 py-2 rounded-md font-medium hover:bg-gray-700 transition duration-300 ease-in-out ${isActive(
                                        '/register'
                                    )}`}
                                    onClick={closeNavbar}
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
