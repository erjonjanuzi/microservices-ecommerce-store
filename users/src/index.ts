import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './natsWrapper';
import { redisWrapper } from './redisWrapper';
import { Seed } from './seed';


const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }
    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL must be defined');
    }
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID must be defined');
    }
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID must be defined');
    }
    if (!process.env.REDIS_URI) {
        throw new Error('REDIS_URI must be defined');
    }

    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL
        );

        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
        });
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());

        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDb');

        await redisWrapper.connect(process.env.REDIS_URI)

    } catch (err) {
        console.error(err);
    }

    await Seed.init()

    app.listen(3000, () => {
        console.log('Listening on port 3000!');
    });
};

start();
