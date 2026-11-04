import { describe, expect, test } from "vitest";
import { handlePort, handleHost, handleEnv } from "./helpers.ts";

describe("centralized config module helpers", () => {
  test("handlePort should validate and return port as a number", () => {
    expect(handlePort("1234")).toBe(1234);
    expect(handlePort("65535")).toBe(65535);
  });


});
