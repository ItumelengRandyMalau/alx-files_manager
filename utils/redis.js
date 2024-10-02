import { createClient } from 'redis';

class RedisClient {
    constructor() {
        // Create a Redis client
        this.client = createClient();

        // Handle connection errors
        this.client.on('error', (err) => {
            console.error('Redis Client Error', err);
        });

        // Connect the client
        this.client.connect()
            .catch(err => console.error('Failed to connect to Redis', err)); // Remove the log on successful connection
    }

    // Check if the Redis connection is alive
    isAlive() {
        return this.client.isOpen;
    }

    // Get value by key
    async get(key) {
        try {
            const value = await this.client.get(key);
            return value;
        } catch (err) {
            console.error('Error getting key from Redis', err);
            return null;
        }
    }

    // Set key-value pair with expiration
    async set(key, value, duration) {
        try {
            await this.client.set(key, value, {
                EX: duration, // Set expiration in seconds
            });
        } catch (err) {
            console.error('Error setting key in Redis', err);
        }
    }

    // Delete key from Redis
    async del(key) {
        try {
            await this.client.del(key);
        } catch (err) {
            console.error('Error deleting key from Redis', err);
        }
    }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
