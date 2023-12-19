'use client';

import React, { useState, useEffect } from 'react';
import { Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';

// Custom styled alert component
const StyledAlert = styled(Alert)(({ theme }) => ({
    backgroundColor: '#f44336', 
    color: '#fff', 
    borderRadius: '8px', 
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', 

    '& .MuiAlert-icon': {
        color: '#fff', 
    },
}));

const ErrorHandler = ({ errorMessage, clearError }) => {
    const [showError, setShowError] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowError(false);
            clearError && clearError();
        }, 5000); // Auto-dismiss error after 5 seconds

        return () => clearTimeout(timer);
    }, [errorMessage, clearError]);

    const handleClose = () => {
        setShowError(false);
        clearError && clearError();
    };

    return (
        <div className='fixed bottom-5 right-5 z-50'>
            {showError && errorMessage && (
                <StyledAlert
                    severity='error'
                    action={
                        <IconButton
                            aria-label='close'
                            color='inherit'
                            size='small'
                            onClick={handleClose}
                        >
                            <CloseIcon fontSize='inherit' />
                        </IconButton>
                    }
                >
                    {errorMessage}
                </StyledAlert>
            )}
        </div>
    );
};

export default ErrorHandler;
