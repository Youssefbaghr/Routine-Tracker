'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { editUser } from '@/lib/features/auth-slice';
import {
    TextField,
    Button,
    Container,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    IconButton,
    Avatar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';

const predefinedImages = [
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    'https://cdn.pixabay.com/photo/2017/03/01/22/18/avatar-2109804_1280.png',
    'https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png',
    'https://cdn.pixabay.com/photo/2014/03/25/16/54/user-297566_1280.png',
    'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png',
    'https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_1280.png',
    'https://cdn.pixabay.com/photo/2021/09/20/03/24/skeleton-6639547_1280.png',
    'https://cdn.pixabay.com/photo/2012/04/13/21/07/user-33638_1280.png',
    'https://cdn.pixabay.com/photo/2014/04/02/17/07/user-307993_1280.png',
];

export default function Settings() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [selectedProfileImg, setSelectedProfileImg] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confrimshowPassword, setConfrimshowPassword] = useState(false);

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

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleConfrimShowPassword = () => {
        setConfrimshowPassword((prevShowPassword) => !prevShowPassword);
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

                const response = await axios.put(
                    `/api/users/edit/${_id}`,
                    userData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                dispatch(editUser(response.data));

                window.location.href = '/dashboard/profile';

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
            <Container maxWidth='md'>
                <Typography variant='h3' align='center' gutterBottom>
                    Settings
                </Typography>
                <form onSubmit={handleSubmit}>
                    {/* Change Name */}
                    <TextField
                        id='name'
                        label='Change Name'
                        fullWidth
                        variant='outlined'
                        value={name}
                        onChange={handleNameChange}
                        placeholder='Enter new name'
                        className='mb-4'
                        sx={{
                            marginY: 1,
                        }}
                    />

                    {/* Change Password */}
                    <Accordion sx={{ marginY: 1 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant='subtitle1'>
                                Change Password
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id='password'
                                        label='New Password'
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        fullWidth
                                        variant='outlined'
                                        value={password}
                                        onChange={handlePasswordChange}
                                        placeholder='Enter new password'
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        onClick={
                                                            handleShowPassword
                                                        }
                                                        aria-label='toggle password visibility'
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id='confirmPassword'
                                        label='Confirm Password'
                                        type={
                                            confrimshowPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        fullWidth
                                        variant='outlined'
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        placeholder='Confirm new password'
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        onClick={
                                                            handleConfrimShowPassword
                                                        }
                                                        aria-label='toggle confirm password visibility'
                                                    >
                                                        {confrimshowPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                    {/* Email Address */}
                    <TextField
                        id='email'
                        label='Email Address'
                        type='email'
                        fullWidth
                        variant='outlined'
                        value={email}
                        onChange={handleEmailChange}
                        placeholder='Enter email address'
                        className='mb-4'
                        sx={{
                            marginY: 1,
                        }}
                    />

                    {/* Choose Profile Image */}
                    <Typography variant='subtitle1' className='mb-2'>
                        Choose Profile Image
                    </Typography>
                    <div className='flex flex-wrap mb-4'>
                        {predefinedImages.map((imgUrl, index) => (
                            <Avatar
                                key={index}
                                alt={`Image ${index}`}
                                src={imgUrl}
                                sx={{
                                    width: 64,
                                    height: 64,
                                    margin: 1,
                                    cursor: 'pointer',
                                    border:
                                        selectedProfileImg === imgUrl
                                            ? '2px solid #2196f3'
                                            : '2px solid transparent',
                                }}
                                onClick={() => handleSelectProfileImg(imgUrl)}
                            />
                        ))}
                    </div>

                    {/* Save Changes Button */}
                    <div className='text-center'>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className='py-2 px-4'
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Container>
        </motion.div>
    );
}
