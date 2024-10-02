import redisClient from './utils/redis';

(async () => {
    console.log(redisClient.isAlive()); // true or false
    console.log(await redisClient.get('myKey')); // null (if not set)

    await redisClient.set('myKey', 12, 5); // Set myKey = 12 with expiration 5 seconds
    console.log(await redisClient.get('myKey')); // 12 (should print the value)

    // Wait for 10 seconds to check if the key expires
    setTimeout(async () => {
        console.log(await redisClient.get('myKey')); // null (after 10 seconds, key should be expired)
    }, 10000); // 1000 ms * 10 = 10 seconds
})();

