import express from 'express';
import { login, Register } from '../Controllers/auth.js';

const router = express.Router();

// Login route
router.post('/login', login);
router.post('/register', Register);

export default router;
