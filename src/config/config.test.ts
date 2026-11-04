import { describe, expect, test } from "vitest";
import { handlePort, handleHost, handleEnv } from "./helpers.ts";

describe("centralized config module helpers", () => {
  test("handlePort should validate and return port as a number", () => {
    expect(handlePort("1234")).toBe(1234);
    expect(handlePort("65535")).toBe(65535);
  });

  test("handlePort should throw before Fastify starts", () => {
    expect(() => handlePort("abc")).toThrow(/NODE_PORT must be an integer/);
    expect(() => handlePort("123.4")).toThrow(/NODE_PORT must be an integer/);
    expect(() => handlePort("")).toThrow(/NODE_PORT must be an integer/);
    expect(() => handlePort("0")).toThrow(/NODE_PORT must be an integer/);
    expect(() => handlePort("70000")).toThrow(/NODE_PORT must be an integer/);
    expect(() => handlePort(undefined)).toThrow(/NODE_PORT must be an integer/);
  });

  test("handleHost should validate and return host as a string", () => {
    expect(handleHost("abc")).toBe("abc");
    expect(handleHost("65535")).toBe("65535");
    expect(handleHost("0.0.0.0")).toBe("0.0.0.0");
  });

  test("handleHost should throw before Fastify starts", () => {
    expect(() => handleHost("")).toThrow(/NODE_HOST must be defined/);
    expect(() => handleHost(undefined)).toThrow(/NODE_HOST must be defined/);
  });

  test("handleEnv should return a config object", () => {
    const envObject = {
      NODE_PORT: "1234",
      NODE_HOST: "1.2.3.4",
    };

    expect(handleEnv(envObject)).toEqual({
      port: 1234,
      host: "1.2.3.4",
    });
  });
});
