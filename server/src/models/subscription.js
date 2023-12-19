import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
});
const SubscriptionModel = mongoose.model('Subscription', subscriptionSchema);

export const Subscription = SubscriptionModel;
