import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabase";

function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-8-10-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a18.5 18.5 0 0 1-5.16 5.94" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

const ROLES = ["admin", "developer", "viewer"];

export default function Login() {
  const [mode, setMode] = useState<"signin" | "create">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("developer");
  const [createMsg, setCreateMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const { data: overview, error: overviewError, isLoading: overviewLoading } = useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const { data: rows } = await supabase.from("overview").select("*");
      return rows?.[0] ?? null;
    },
  });

  const createUser = async () => {
    setCreateMsg(null);
    const { error } = await supabase.auth.signUp({
      email: newEmail,
      password: newPassword,
      options: { data: { username: newUsername, role: newRole } },
    });
    if (error) {
      setCreateMsg({ ok: false, text: `Could not create user "${newUsername}": ${error.message}` });
      return;
    }
    setCreateMsg({
      ok: true,
      text: `User "${newUsername}" created with role "${newRole}" in Supabase Auth.`,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-8">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold">SentinelOps Console</h1>
        <p className="mt-2 text-sm text-gray-400">
          Sign in with GitHub or username/password via Keycloak. Role after login: admin / developer / viewer.
        </p>
        <div className="stack mt-6">
          {mode === "signin" ? (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  className="input"
                  autoComplete="username"
                  placeholder="developer"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    className="input"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="btn btn-ghost btn-icon absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Sign in
              </button>
              <button type="button" className="btn btn-ghost btn-block" onClick={() => setMode("create")}>
                Create user
              </button>
              <p className="text-center text-sm text-gray-400">or continue with GitHub via Keycloak OIDC</p>
            </>
          ) : (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="new-username">
                  Username
                </label>
                <input
                  id="new-username"
                  className="input"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="jane.doe"
                  autoComplete="username"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="new-email">
                  Email
                </label>
                <input
                  id="new-email"
                  className="input"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="jane.doe@company.com"
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="new-password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="new-password"
                    className="input"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="btn btn-ghost btn-icon absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="new-role">
                  Role
                </label>
                <select
                  id="new-role"
                  className="input"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <button type="button" className="btn btn-primary btn-block" onClick={createUser}>
                Create user
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-block"
                onClick={() => {
                  setMode("signin");
                  setCreateMsg(null);
                }}
              >
                Back to sign in
              </button>
            </>
          )}
        </div>
        {createMsg ? (
          <div className={`alert mt-6 ${createMsg.ok ? "alert-success" : "alert-danger"}`}>
            <p className="text-sm">{createMsg.text}</p>
          </div>
        ) : null}
        <div className="alert mt-6">
          <p className="text-sm">
            Cluster snapshot:{" "}
            {overviewLoading
              ? "connecting to Supabase database…"
              : overviewError
                ? `database unreachable: ${overviewError.message}`
                : overview
                  ? JSON.stringify(overview)
                  : "no data"}
          </p>
        </div>
      </div>
    </div>
  );
}
