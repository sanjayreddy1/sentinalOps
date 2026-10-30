import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import Overview from "./Overview";

vi.mock("recharts", () => ({
  ResponsiveContainer: (props: { children?: ReactNode }) => props.children,
  LineChart: (props: { children?: ReactNode }) => props.children,
  Line: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
}));

vi.mock("../utils/supabase", () => ({
  supabase: {
    from: () => ({
      select: () =>
        Promise.resolve({
          data: [
            {
              cluster_health: { nodes_ready: 3, nodes_total: 3 },
              deploys_today: 14,
              open_incidents: 1,
              monthly_cost: 212,
              savings_vs_fixed: -37,
              policy_blocks: 9,
              request_rate: 42,
              error_rate: 0.004,
            },
          ],
          error: null,
        }),
    }),
  },
}));

describe("Overview screen", () => {
  it("renders the platform overview heading and stats", async () => {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });

    render(
      <QueryClientProvider client={client}>
        <Overview />
      </QueryClientProvider>
    );

    expect(await screen.findByText("Platform Overview")).toBeInTheDocument();
    expect((await screen.findAllByText(/Cluster health/i)).length).toBeGreaterThan(0);
    expect(screen.getByText("Deploys today")).toBeInTheDocument();
  });
});
