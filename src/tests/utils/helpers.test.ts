import { generateRandomPassword } from "@/lib/utils";
import { describe, expect, it } from "vitest";

describe("generateRandomPassword", () => {
  it("should generate a random password of the correct length", () => {
    const password = generateRandomPassword(10);
    expect(password).toHaveLength(10);
  });

  it("should generate a random password that is a hex string", () => {
    const password = generateRandomPassword(10);
    expect(password).toMatch(/^[0-9a-f]+$/);
  });
});
