import { useQuery } from "@tanstack/react-query";

const badgeFor = (status: string) => {
  switch (status.toLowerCase()) {
    case "synced":
    case "pass":
    case "resolved":
      return "badge-pass";
    case "progressing":
    case "degraded":
    case "firing":
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

export default function Incidents() {
  const { data } = useQuery({
    queryKey: ["incidents"],
    queryFn: async () => (await fetch("/api/incidents")).json(),
  });

  const incidents = Array.isArray(data) ? data : [data];

  return (
    <div>
      <h2 className="text-2xl font-bold">Incidents and Self-Healing</h2>
      <p className="mt-1 text-sm text-gray-400">Alerts, automated remediation and time-to-recover metrics.</p>

      <div className="mt-6 grid max-w-4xl gap-4">
        {incidents.map((i: any, idx: number) => (
          <div key={idx} className="card">
            <div className="row">
              <span className={`badge ${badgeFor(String(i.status))}`}>{i.status}</span>
              <span className="text-sm font-semibold text-gray-200">{i.alert}</span>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              service {i.service} · remediation: {i.remediation} · recovered in {i.recovered_seconds}s
            </p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Detail view: alert, automated remediation (e.g. restart deployment payments), whether it resolved, time to recover, links to
        Grafana/Loki/Tempo.
      </p>
    </div>
  );
}
