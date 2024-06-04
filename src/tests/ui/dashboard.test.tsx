import { expect, test } from "vitest";
import { render, screen } from "@/tests/utils";
import Page from "@/app/(app)/app/page";

test("should render dashboard page", () => {
  render(<Page />);
  expect(screen.getByRole("heading", { level: 1, name: "Dashboard" })).toBeDefined();
});