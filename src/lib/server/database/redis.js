import Redis from 'ioredis';
import { env } from '$env/dynamic/private';


const RedisUrl = env.Redis
const redis = new Redis(`${RedisUrl}`)

/**@param {string} email */
export function getUserByEmail(email) {
    return redis.hgetall(email)
}


/**
 * @param {import("ioredis").RedisKey} uuid
 * @param {string | number} email
 * @param {number} ttl
 */
export function createSessionToken(uuid, email, ttl) {
    return redis.set(uuid, email, "EX", ttl)
}

/**
 * @param {import("ioredis").RedisKey} uuid
 * @param {string | number} ttl
 */
export function extendExpiry(uuid, ttl) {
    return redis.expire(uuid, ttl)
}

/**
 * @param {string} uuid
 */
export function deleteSessionToken(uuid) {
    return redis.del(uuid)
}

/**
 * @param {import("ioredis").RedisKey} uuid
 */
export function getUserBySessionToken(uuid) {
    return redis.get(uuid).then(result => {
        if (result) {
            return redis.hgetall(result)
        }
        return null
    })
}

/**
 * @param {string} session_id
 * @param {string} project
 */
export function setUserPreferredProject(session_id, project) {
    return redis.get(session_id).then(email => {
        if (email) {
            return redis.hset(email, "project", project)
        }
        return null
    })
}

/**
 * @param {import("ioredis").RedisKey} key
 * @param {string | number } value
 * @param {string | number} ttl
 */
export function setExpiryingKeyValue(key, value, ttl) {
    return redis.set(key, value, "EX", ttl)
}

/**
 * @param {import("ioredis").RedisKey} key
 * @param {string | number} value
 */
export function setKeyValue(key, value) {
    return redis.set(key, value)
}

/**
 * @param {import("ioredis").RedisKey} key
 */
export function getKeyValue(key) {
    return redis.get(key)
}

/**
 * @param {import("ioredis").RedisKey} item
 */
export function getHashRecord(item) {
    return redis.hgetall(item)
}

/**
 * @param {import("ioredis").RedisKey} item
 * @param {object} value
 */
export function setHashRecord(item, value) {
    return redis.hset(item, value)
}

/**
 * @param {string} item
 */
export function deleteRecord(item) {
    return redis.del(item)
}

