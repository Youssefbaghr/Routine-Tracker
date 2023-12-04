import express from 'express';
import connectToMongoDB from './db/db.js';
import mongoose from 'mongoose';
import { notFound } from './routes/NotFound.js';
import errorHandler from './Middleware/errorHandler.js';
import httpStatus from 'http-status-codes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import routineRouter from './routes/routine.js';
import AuthRouter from './routes/auth.js';
import UserRoute from './routes/user.js';

const app = express();
const PORT = 4097;

// DB Connection
mongoose.set('strictQuery', true);
connectToMongoDB();

// Middleware to parse JSON
app.use(express.json());

// Configaration
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use(
    cors({
        origin: 'YOUR CLIENT URL',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

//Routes
app.use('/routines', routineRouter);
app.use('/api', UserRoute);
app.use('/api', AuthRouter);

// Basic route for testing if the server is running
app.get('/', (req, res) => {
    res.send('Server is running!');
});

//404 Route
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

app.use((err, req, res, next) => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal Server Error',
        error: err,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
