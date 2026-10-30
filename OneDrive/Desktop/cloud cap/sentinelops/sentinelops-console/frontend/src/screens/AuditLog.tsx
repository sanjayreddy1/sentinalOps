import { useQuery } from "@tanstack/react-query";

export default function AuditLog() {
  const { data } = useQuery({
    queryKey: ["audit"],
    queryFn: async () => (await fetch("/api/audit")).json(),
  });

  const entries = Array.isArray(data) ? data : [data];

  return (
    <div>
      <h2 className="text-2xl font-bold">Audit Log</h2>
      <p className="mt-1 text-sm text-gray-400">Every action (human or automated): who/what, what changed, when, result.</p>

      <div className="card mt-6 max-w-5xl">
        <pre className="overflow-x-auto text-xs text-gray-300">{JSON.stringify(entries, null, 2)}</pre>
      </div>

      <p className="mt-6 text-sm text-gray-500">Who/what changed, when, and the result. Exportable as CSV.</p>
    </div>
  );
}
