import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
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

const overviewData = {
  cluster_health: { nodes_ready: 3, nodes_total: 3 },
  deploys_today: 14,
  open_incidents: 1,
  monthly_cost: 212,
  savings_vs_fixed: -37,
  policy_blocks: 9,
  request_rate: 42,
  error_rate: 0.004,
};

describe("Overview screen", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(overviewData),
        })
      )
    );
  });

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
