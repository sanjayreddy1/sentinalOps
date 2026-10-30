import { useQuery } from "@tanstack/react-query";

const badgeFor = (status: string) => {
  switch (status.toLowerCase()) {
    case "synced":
      return "badge-pass";
    case "progressing":
    case "degraded":
      return "badge-warn";
    case "failed":
    case "aborted":
      return "badge-fail";
    case "running":
      return "badge-running";
    case "critical":
      return "badge-critical";
    case "high":
      return "badge-high";
    case "medium":
      return "badge-medium";
    case "low":
      return "badge-low";
    default:
      return "badge-pass";
  }
};

export default function Deployments() {
  const { data } = useQuery({
    queryKey: ["deployments"],
    queryFn: async () => (await fetch("/api/deployments")).json(),
  });

  const deployments = Array.isArray(data) ? data : [data];

  return (
    <div>
      <h2 className="text-2xl font-bold">Deployments and Releases</h2>
      <p className="mt-1 text-sm text-gray-400">GitOps-synced workloads with canary rollout state.</p>

      <div className="card mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="p-2">Service</th>
              <th className="p-2">Version</th>
              <th className="p-2">Env</th>
              <th className="p-2">Sync status</th>
              <th className="p-2">Rollout state</th>
            </tr>
          </thead>
          <tbody>
            {deployments.map((d: any) => (
              <tr key={d.service} className="border-t border-navy-800">
                <td className="p-2 text-gray-200">{d.service}</td>
                <td className="p-2 text-gray-200">{d.version}</td>
                <td className="p-2 text-gray-200">{d.env}</td>
                <td className="p-2">
                  <span className={`badge ${badgeFor(String(d.sync_status))}`}>{d.sync_status}</span>
                </td>
                <td className="p-2 text-gray-200">{d.rollout_state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card mt-6">
        <h3 className="text-xl font-bold">Release detail</h3>
        <p className="mt-2 text-sm text-gray-400">
          Canary progress bar (10, 30, 60, 100%), live success rate and p95 latency vs thresholds, timeline, Promote/Pause/Abort (role
          restricted).
        </p>
      </div>
    </div>
  );
}
