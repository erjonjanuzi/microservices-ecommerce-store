import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './natsWrapper';
import {createClient} from 'redis'
import { RedisClientType, RedisClusterType } from '@node-redis/client';

export let redisClient: (RedisClientType | RedisClusterType)

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
    if (!process.env.REDIS_HOST){
        throw new Error('REDIS_HOST must be defined')
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

        redisClient = createClient({
            url: `redis://${process.env.REDIS_HOST}:6379`
        });

        redisClient.on('error', (err: any) => console.log('Redis Client Error', err));

        await redisClient.connect();
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!');
    });
};

start();
