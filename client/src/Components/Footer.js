import React from 'react';

const Footer = () => {
    return (
        <footer className='bg-gray-800 text-white py-4'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between'>
                <div className='text-center sm:text-left mb-2 sm:mb-0'>
                    <p className='text-sm'>
                        © 2023 Fitness Planner. All rights reserved.
                    </p>
                </div>
                <ul className='flex justify-center sm:justify-end space-x-4'>
                    <li>
                        <a href='/' className='hover:text-gray-300'>
                            Terms
                        </a>
                    </li>
                    <li>
                        <a href='/' className='hover:text-gray-300'>
                            Privacy
                        </a>
                    </li>
                    <li>
                        <a href='/' className='hover:text-gray-300'>
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
