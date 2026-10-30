import { useQuery } from "@tanstack/react-query";

export default function Costs() {
  const { data } = useQuery({
    queryKey: ["costs"],
    queryFn: async () => (await fetch("/api/costs")).json(),
  });

  const byNamespace = data?.by_namespace ?? {};
  const savings = data?.top_savings ?? [];

  return (
    <div>
      <h2 className="text-2xl font-bold">Cost and Capacity</h2>
      <p className="mt-1 text-sm text-gray-400">OpenCost spend, KEDA autoscaling savings and capacity headroom.</p>

      <div className="mt-6 grid max-w-4xl gap-4 md:grid-cols-2">
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-accent">Monthly cost</p>
          <p className="mt-2 text-xl font-semibold text-white">${data?.monthly_cost}</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-accent">Savings vs fixed</p>
          <p className="mt-2 text-xl font-semibold text-white">{data?.savings_vs_fixed}%</p>
        </div>
      </div>

      <div className="card mt-6">
        <h3 className="text-xl font-bold">Cost by namespace</h3>
        <p className="mt-2 text-sm text-gray-400">Namespace: {JSON.stringify(byNamespace)}</p>
      </div>

      <div className="card mt-6">
        <h3 className="text-xl font-bold">Top savings recommendations</h3>
        <ul className="stack mt-2">
          {savings.map((s: any, i: number) => (
            <li key={i} className="text-sm text-gray-300">
              {s.recommendation} (saving {s.saving_pct}%)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
