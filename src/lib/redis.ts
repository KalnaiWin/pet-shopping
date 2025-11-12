import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function test() {
  try {
    console.log("Testing connection...");
    await redis.set("hello", "world");
    const value = await redis.get("hello");
    console.log("Redis connected! Value:", value);
  } catch (error) {
    console.error("❌ Redis connection failed:", error);
  }
}

test();
