import { describe, expect, it } from "vitest";
import { isAtLeastAge } from "./age";

describe("isAtLeastAge", () => {
  const today = new Date("2026-08-18T12:00:00.000Z");

  it("accepts an adult on their eighteenth birthday", () => {
    expect(isAtLeastAge(new Date("2008-08-18T00:00:00.000Z"), 18, today)).toBe(true);
  });

  it("rejects an applicant below the minimum age", () => {
    expect(isAtLeastAge(new Date("2008-08-19T00:00:00.000Z"), 18, today)).toBe(false);
  });
});
