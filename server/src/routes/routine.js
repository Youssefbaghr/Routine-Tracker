import express from 'express';
import {
    getAllRoutines,
    createRoutine,
    editRoutineById,
    getRoutineById,
    deleteRoutineById,
} from '../Controllers/routine.js';
import protect from '../Middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAllRoutines);
router.get('/:id', protect, getRoutineById);
router.post('/createRoutine', protect, createRoutine);
router.put('/edit/:id', protect, editRoutineById);
router.delete('/delete/:id', protect, deleteRoutineById);

export default router;
