import { useQuery } from "@tanstack/react-query";

export default function Login() {
  const { data: overview } = useQuery({
    queryKey: ["overview"],
    queryFn: async () => (await fetch("/api/overview")).json(),
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-8">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold">SentinelOps Console</h1>
        <p className="mt-2 text-sm text-gray-400">
          Sign in with GitHub or username/password via Keycloak. Role after login: admin / developer / viewer.
        </p>
        <div className="stack mt-6">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="username">
              Username
            </label>
            <input id="username" className="input" autoComplete="username" placeholder="developer" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input id="password" className="input" type="password" autoComplete="current-password" placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Sign in
          </button>
          <p className="text-center text-sm text-gray-400">or continue with GitHub via Keycloak OIDC</p>
        </div>
        <div className="alert alert-info mt-6">
          <p className="text-sm">
            Cluster snapshot: <code>{JSON.stringify(overview)}</code>
          </p>
        </div>
      </div>
    </div>
  );
}
