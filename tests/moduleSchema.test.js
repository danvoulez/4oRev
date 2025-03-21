import { describe, it, expect } from "vitest";
import { moduleSchema } from "../core/validation/moduleSchema";

describe("moduleSchema validation", () => {
  it("should validate a correct module", () => {
    const result = moduleSchema.safeParse({
      id: "test",
      name: "Teste",
      type: "dashboard",
      status: "active",
      role: ["admin"],
      components: ["A", "B"],
      created_at: "2025-01-01T00:00:00Z",
      last_updated: "2025-01-01T00:00:00Z"
    });
    expect(result.success).toBe(true);
  });

  it("should reject an invalid module", () => {
    const result = moduleSchema.safeParse({
      id: "test",
      name: "Teste",
      status: "enabled"
    });
    expect(result.success).toBe(false);
  });
});