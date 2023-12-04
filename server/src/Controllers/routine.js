import { Routines } from '../models/Routines.js';

const createRoutine = async (req, res) => {
    try {
        const { title, description, tasks, userId } = req.body;

        const routine = new Routines({
            title,
            description,
            tasks,
            userId,
        });

        const newRoutine = await routine.save();
        res.status(201).json({ routine: newRoutine });
    } catch (err) {
        res.status(400).json({ error: 'Bad request', message: err.message });
    }
};

const editRoutineById = async (req, res) => {
    try {
        const { title, description, tasks } = req.body;

        const updatedRoutine = await Routines.findOneAndUpdate(
            { _id: req.params.id, userId: req.user },
            { title, description, tasks },
            { new: true }
        );

        if (!updatedRoutine) {
            return res
                .status(404)
                .json({ error: 'Not found', message: 'Routine not found' });
        }

        res.status(200).json({ routine: updatedRoutine });
    } catch (err) {
        res.status(400).json({ error: 'Bad request', message: err.message });
    }
};

const getAllRoutines = async (req, res) => {
    try {
        const userId = req.user;

        const routines = await Routines.find({ userId: userId });
        res.status(200).json({ routines });
    } catch (err) {
        res.status(500).json({
            error: 'Internal server error',
            message: err.message,
        });
    }
};

const deleteRoutineById = async (req, res) => {
    try {
        const deletedRoutine = await Routines.findOneAndDelete({
            _id: req.params.id,
            userId: req.user,
        });

        if (!deletedRoutine) {
            return res
                .status(404)
                .json({ error: 'Not found', message: 'Routine not found' });
        }

        res.status(200).json({ message: 'Routine deleted' });
    } catch (err) {
        res.status(500).json({
            error: 'Internal server error',
            message: err.message,
        });
    }
};

const getRoutineById = async (req, res) => {
    try {
        const routine = await Routines.findOne({
            _id: req.params.id,
            userId: req.userId,
        });

        if (!routine) {
            return res
                .status(404)
                .json({ error: 'Not found', message: 'Routine not found' });
        }

        res.status(200).json({ routine });
    } catch (err) {
        res.status(500).json({
            error: 'Internal server error',
            message: err.message,
        });
    }
};

export {
    getAllRoutines,
    createRoutine,
    editRoutineById,
    deleteRoutineById,
    getRoutineById,
};
