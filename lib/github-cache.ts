import { Redis } from "@upstash/redis";

const TTL_SECONDS = 60 * 60;

// A missing or unavailable cache should not prevent the portfolio from loading.
export async function cachedGithubData<T>(key: string, load: () => Promise<T>): Promise<T> {
  const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

  if (redis) {
    try {
      const cached = await redis.get<T>(key);
      if (cached !== null) return cached;
    } catch (error) {
      console.error("GitHub cache read failed", error);
    }
  }

  const data = await load();
  if (redis) {
    try {
      await redis.set(key, data, { ex: TTL_SECONDS });
    } catch (error) {
      console.error("GitHub cache write failed", error);
    }
  }
  return data;
}

export function validGithubUsername(username: string) {
  return /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(username);
}
