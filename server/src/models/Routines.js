import mongoose from 'mongoose';

const routinesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        tasks: {
            type: Array,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

let RoutineModel;

RoutineModel = mongoose.model('Routine', routinesSchema);

export const Routines = RoutineModel;
