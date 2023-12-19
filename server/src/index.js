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
import { Subscription } from './models/subscription.js';

const app = express();
const PORT = 4097;

// DB Connection
mongoose.set('strictQuery', true);
connectToMongoDB();

// Middleware to parse JSON
app.use(express.json());

// Configaration
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
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
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

//Routes
app.use('/routines', routineRouter);
app.use('/api', UserRoute);
app.use('/api', AuthRouter);

app.post('/api/subscribe', async (req, res) => {
    const { email } = req.body;

    // Perform validation for a valid email format (you can use a regex or any validation library)
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    try {
        // Check if the email already exists in the database
        const existingSubscription = await Subscription.findOne({ email });

        if (existingSubscription) {
            return res.status(400).json({ error: 'Email already subscribed' });
        } else {
            // Create a new subscription entry and save it to the database
            const newSubscription = new Subscription({ email });
            await newSubscription.save();

            return res.status(200).json({
                message: 'Subscription successful',
                subscribedEmail: email,
            });
        }
    } catch (error) {
        console.error('Subscription error:', error);
        return res.status(500).json({ error: 'Subscription failed' });
    }
});

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
