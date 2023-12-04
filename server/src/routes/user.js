import { Router } from 'express';
import { getById, updateUser, deleteUser } from '../Controllers/user.js';
import protect from '../Middleware/authMiddleware.js';

const router = Router();

// Define the routes
router.get('/users/:id', protect, getById);
router.put('/users/edit/:id', protect, updateUser);
router.delete('/users/delete/:id', protect, deleteUser);

export default router;
