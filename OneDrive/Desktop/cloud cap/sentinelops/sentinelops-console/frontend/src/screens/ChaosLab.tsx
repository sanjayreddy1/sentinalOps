import { useQuery } from "@tanstack/react-query";

export default function ChaosLab() {
  const { data } = useQuery({
    queryKey: ["chaos-experiments"],
    queryFn: async () => (await fetch("/api/chaos/experiments")).json(),
  });

  const experiments = Array.isArray(data) ? data : [data];

  return (
    <div>
      <h2 className="text-2xl font-bold">Chaos Lab</h2>
      <p className="mt-1 text-sm text-gray-400">Chaos experiments with automated recovery verification.</p>

      <div className="mt-6 grid max-w-4xl gap-4">
        {experiments.map((e: any) => (
          <div key={e.name} className="card">
            <div className="row">
              <span className="badge badge-warn">{e.last_result}</span>
              <span className="text-sm font-semibold text-gray-200">{e.name}</span>
            </div>
            <p className="mt-2 text-sm text-gray-400">Hypothesis: {e.hypothesis}</p>
            <p className="mt-1 text-sm text-gray-400">Blast radius: {e.blast_radius}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Run button starts an experiment (admin only, staging only by default) and shows live recovery graphs + pass/fail verdict against the
        target.
      </p>
    </div>
  );
}
