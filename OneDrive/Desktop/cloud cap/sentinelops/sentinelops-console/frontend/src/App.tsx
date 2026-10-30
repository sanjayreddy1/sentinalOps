import { useState } from "react";

import Login from "./screens/Login";
import Overview from "./screens/Overview";
import Deployments from "./screens/Deployments";
import SecurityCenter from "./screens/SecurityCenter";
import Incidents from "./screens/Incidents";
import Costs from "./screens/Costs";
import ChaosLab from "./screens/ChaosLab";
import AuditLog from "./screens/AuditLog";

type Screen =
  | "login"
  | "overview"
  | "deployments"
  | "security"
  | "incidents"
  | "costs"
  | "chaos"
  | "audit";

const NAV: { id: Screen; label: string }[] = [
  { id: "overview", label: "Home" },
  { id: "deployments", label: "Deploy" },
  { id: "security", label: "Securi" },
  { id: "incidents", label: "Incid" },
  { id: "costs", label: "Costs" },
  { id: "chaos", label: "Chaos" },
  { id: "audit", label: "Audit" },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");

  if (screen === "login") {
    return <Login />;
  }

  const active = NAV.find((n) => n.id === screen);

  return (
    <div className="min-h-screen">
      <header className="border-b border-navy-800 bg-navy-900">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              SentinelOps <span className="text-gradient">Console</span>
            </h1>
            <p className="text-sm text-cyan-accent">Ship fast. Stay secure. Self-heal.</p>
          </div>
          <nav className="row" aria-label="Console screens">
            {NAV.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setScreen(n.id as Screen)}
                className={`btn btn-sm ${screen === n.id ? "btn-primary" : "btn-secondary"}`}
              >
                {n.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">
        {screen === "overview" && <Overview />}
        {screen === "deployments" && <Deployments />}
        {screen === "security" && <SecurityCenter />}
        {screen === "incidents" && <Incidents />}
        {screen === "costs" && <Costs />}
        {screen === "chaos" && <ChaosLab />}
        {screen === "audit" && <AuditLog />}
      </main>
    </div>
  );
}
