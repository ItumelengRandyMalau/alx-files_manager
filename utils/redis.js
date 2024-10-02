import redis from 'redis';

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    // Handle Redis client errors
    this.client.on('error', (error) => {
      console.error('Redis client error:', error);
    });
  }

  /**
   * Checks if the Redis client is connected
   * @returns {boolean} true if connected, false otherwise
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * Retrieves a value from Redis based on key
   * @param {string} key - The key to retrieve the value
   * @returns {Promise<string|null>} - Promise resolving to the value or null if key does not exist
   */
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, reply) => {
        if (error) {
          reject(error);
        } else {
          resolve(reply);
        }
      });
    });
  }

  /**
   * Sets a value in Redis with an optional expiration time
   * @param {string} key - The key to set the value
   * @param {string} value - The value to set
   * @param {number} [duration] - Optional duration in seconds for expiration
   * @returns {Promise<string>} - Promise resolving to 'OK' if successful
   */
  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      if (duration) {
        this.client.setex(key, duration, value, (error, reply) => {
          if (error) {
            reject(error);
          } else {
            resolve(reply);
          }
        });
      } else {
        this.client.set(key, value, (error, reply) => {
          if (error) {
            reject(error);
          } else {
            resolve(reply);
          }
        });
      }
    });
  }

  /**
   * Deletes a key from Redis
   * @param {string} key - The key to delete
   * @returns {Promise<boolean>} - Promise resolving to true if key was deleted, false otherwise
   */
  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (error, reply) => {
        if (error) {
          reject(error);
        } else {
          resolve(reply === 1); // Redis del command returns 1 if key was deleted, 0 otherwise
        }
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;
