import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabase";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Overview() {
  const { data } = useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const { data: rows } = await supabase.from("overview").select("*");
      return rows?.[0] ?? null;
    },
  });

  const stats = [
    {
      label: "Cluster health",
      value: data?.cluster_health
        ? `${data.cluster_health.nodes_ready}/${data.cluster_health.nodes_total} nodes ready`
        : "—",
    },
    { label: "Deploys today", value: data?.deploys_today },
    { label: "Open incidents", value: data?.open_incidents },
    { label: "Monthly cost", value: data ? `$${data.monthly_cost}` : "—" },
    { label: "Savings vs fixed", value: data ? `${data.savings_vs_fixed}%` : "—" },
    { label: "Policy blocks", value: data?.policy_blocks },
  ];

  const chartData = [
    { t: "18:00", requests: 38, error_rate: 0.004 },
    { t: "18:30", requests: 41, error_rate: 0.003 },
    { t: "19:00", requests: 44, error_rate: 0.005 },
    { t: "19:30", requests: 39, error_rate: 0.002 },
    { t: "20:00", requests: 46, error_rate: 0.006 },
    { t: "20:30", requests: 43, error_rate: 0.004 },
    { t: "21:00", requests: 47, error_rate: 0.007 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold">Platform Overview</h2>
      <p className="mt-1 text-sm text-gray-400">Live cluster health, deploy, incident and cost signals.</p>

      <div className="mt-6 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="card">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-accent">{s.label}</p>
            <p className="mt-2 text-xl font-semibold text-white">{String(s.value)}</p>
          </div>
        ))}
      </div>

      <div className="card mt-6 max-w-4xl">
        <h3 className="text-xl font-bold">Request rate / error rate (live, 1h)</h3>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#243350" />
              <XAxis dataKey="t" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="requests" stroke="#0F8B8D" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="error_rate" stroke="#DC2626" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
