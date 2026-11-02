import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { StatusBadge } from "@/components/ui/StatusBadge";

describe("StatusBadge", () => {
  it.each([
    ["free", "14:00", "Liberă până la 14:00"],
    ["free", null, "Liberă"],
    ["occupied", "12:00", "Ocupată până la 12:00"],
    ["occupied", null, "Ocupată"],
    ["unknown", null, "Stare necunoscută"],
    ["unknown", "12:00", "Stare necunoscută"],
  ] as const)("%s with until=%s shows %s", (status, until, text) => {
    const html = renderToStaticMarkup(<StatusBadge status={status} until={until} />);
    expect(html).toContain(`>${text}</span>`);
  });
});
