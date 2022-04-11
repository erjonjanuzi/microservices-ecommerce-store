import { RedisClientType, RedisClusterType } from '@node-redis/client';
import { createClient } from 'redis';

class RedisWrapper {
    private _client?: RedisClientType | RedisClusterType;

    get client() {
        if (!this._client) {
            throw new Error('Cannot access Redis client before connecting');
        }

        return this._client;
    }

    async connect(url: string) {
        this._client = createClient({ url });

        await this.client.connect();

        return new Promise<void>((resolve, reject) => {
            this.client.on('error', (err) => {
                console.log('Error connecting to Redis');
                reject(err);
            });
            
            console.log('Connected to Redis');
            resolve();
        });
    }
}

export const redisWrapper = new RedisWrapper();
