import { afterAll, beforeAll, expect, test } from "bun:test";
import { cachedGithubData, validGithubUsername } from "../lib/github-cache";

const oldUrl = process.env.UPSTASH_REDIS_REST_URL;
const oldToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const values = new Map<string, string>();
const commands: string[][] = [];
const server = Bun.serve({
  port: 0,
  async fetch(request) {
    const body: string[][] = await request.json();
    return Response.json(body.map((command) => {
      commands.push(command);
      if (command[0].toLowerCase() === "get") return { result: values.get(command[1]) ?? null };
      if (command[0].toLowerCase() === "set") {
        values.set(command[1], command[2]);
        return { result: "OK" };
      }
      return { error: "Unexpected command" };
    }));
  },
});

beforeAll(() => {
  process.env.UPSTASH_REDIS_REST_URL = server.url.toString();
  process.env.UPSTASH_REDIS_REST_TOKEN = "test";
});
afterAll(() => {
  if (oldUrl === undefined) delete process.env.UPSTASH_REDIS_REST_URL;
  else process.env.UPSTASH_REDIS_REST_URL = oldUrl;
  if (oldToken === undefined) delete process.env.UPSTASH_REDIS_REST_TOKEN;
  else process.env.UPSTASH_REDIS_REST_TOKEN = oldToken;
  server.stop();
});

test("uses Redis on subsequent requests and expires cached results after an hour", async () => {
  let loads = 0;
  const load = async () => { loads++; return { count: 42 }; };
  expect(await cachedGithubData("test:activity", load)).toEqual({ count: 42 });
  expect(await cachedGithubData("test:activity", load)).toEqual({ count: 42 });
  expect(loads).toBe(1);
  const set = commands.find((command) => command[0].toLowerCase() === "set");
  expect(set?.slice(-2).map((value) => String(value).toLowerCase())).toEqual(["ex", "3600"]);
});

test("does not cache failed upstream requests", async () => {
  await expect(cachedGithubData("test:failure", async () => { throw new Error("upstream failed"); })).rejects.toThrow("upstream failed");
  expect(commands.some((command) => command[0].toLowerCase() === "set" && command[1] === "test:failure")).toBe(false);
});

test("validates usernames before using them in upstream URLs", () => {
  expect(validGithubUsername("tanav29")).toBe(true);
  expect(validGithubUsername("../other")).toBe(false);
});
