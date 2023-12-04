import React from 'react';

const Contact = () => {
    return (
        <div className='container mx-auto px-4 py-8'>
            <div className='max-w-md mx-auto mb-8'>
                {/* First Row: Contact Information */}
                <div className='mb-6'>
                    <h2 className='text-xl font-semibold mb-4'>
                        Contact Information
                    </h2>
                    <div className='flex flex-col space-y-2'>
                        <p className='text-gray-700'>
                            <strong>Phone:</strong> +1234567890
                        </p>
                        <p className='text-gray-700'>
                            <strong>Email:</strong> example@example.com
                        </p>
                        <p className='text-gray-700'>
                            <strong>Location:</strong> Your Location, City,
                            Country
                        </p>
                    </div>
                </div>

                {/* Second Row: Contact Form */}
                <div>
                    <h2 className='text-xl font-semibold mb-4'>Get in Touch</h2>
                    <form>
                        <div className='mb-4'>
                            <label
                                htmlFor='name'
                                className='block text-gray-700 font-semibold mb-2'
                            >
                                Name
                            </label>
                            <input
                                type='text'
                                id='name'
                                className='w-full rounded-md border-gray-300 focus:outline-none focus:border-blue-500 px-4 py-2'
                                placeholder='Enter your name'
                            />
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor='email'
                                className='block text-gray-700 font-semibold mb-2'
                            >
                                Email
                            </label>
                            <input
                                type='email'
                                id='email'
                                className='w-full rounded-md border-gray-300 focus:outline-none focus:border-blue-500 px-4 py-2'
                                placeholder='Enter your email'
                            />
                        </div>
                        <div className='mb-6'>
                            <label
                                htmlFor='message'
                                className='block text-gray-700 font-semibold mb-2'
                            >
                                Message
                            </label>
                            <textarea
                                id='message'
                                className='w-full rounded-md border-gray-300 focus:outline-none focus:border-blue-500 px-4 py-2 h-32 resize-none'
                                placeholder='Write your message here'
                            ></textarea>
                        </div>
                        <div className='text-center'>
                            <button
                                type='submit'
                                className='py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300'
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
