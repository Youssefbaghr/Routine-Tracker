import mongoose from 'mongoose';

const mongodbUrl ='YOUR_MONGO_DB_URL';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongodbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB : ', err.hostname, err);
    }
};

export default connectToMongoDB;
