import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function SecurityCenter() {
  const [tab, setTab] = useState("vulnerabilities");

  const { data: vulns } = useQuery({
    queryKey: ["vulnerabilities"],
    queryFn: async () => (await fetch("/api/vulnerabilities")).json(),
  });
  const { data: policy } = useQuery({
    queryKey: ["policy-violations"],
    queryFn: async () => (await fetch("/api/policy-violations")).json(),
  });

  const vulnerabilities = Array.isArray(vulns) ? vulns : [vulns];
  const violations = Array.isArray(policy) ? policy : [policy];

  const tabs = [
    { id: "vulnerabilities", label: "Vulnerabilities", data: vulnerabilities },
    { id: "policy", label: "Policy Violations", data: violations },
  ];

  const active = tabs.find((t) => t.id === tab) ?? tabs[0];

  return (
    <div>
      <h2 className="text-2xl font-bold">Security Center</h2>
      <p className="mt-1 text-sm text-gray-400">Vulnerabilities, image signing and admission policy enforcement.</p>

      <div className="row mt-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`btn ${active.id === t.id ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="card mt-6 max-w-4xl">
        {active.id === "vulnerabilities" ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="p-2">Workload</th>
                <th className="p-2">Severity</th>
                <th className="p-2">Package</th>
                <th className="p-2">Fixed in</th>
              </tr>
            </thead>
            <tbody>
              {vulnerabilities.map((v: any, i: number) => (
                <tr key={i} className="border-t border-navy-800">
                  <td className="p-2 text-gray-200">{v.workload}</td>
                  <td className="p-2">
                    <span className={`badge badge-${v.severity?.toLowerCase() ?? "low"}`}>{v.severity}</span>
                  </td>
                  <td className="p-2 text-gray-200">{v.package}</td>
                  <td className="p-2 text-gray-200">{v.fixed_in}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="stack">
            {violations.map((v: any, i: number) => (
              <div key={i}>
                <span className="badge badge-fail">{v.policy}</span>{" "}
                <span className="text-sm text-gray-300">{v.resource}</span>
                <p className="mt-2 text-sm text-gray-400">
                  user {v.user}: {v.reason}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
