import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Lock, Mail, ArrowRight, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Staff Login — IMAM ESTUDIO OS" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        toast.error(error.message);
        setLoading(false);
        return;
      }

      toast.success("Authenticated successfully");
      navigate({ to: "/admin/dashboard" });
    } catch (err: any) {
      setErrorMsg(err.message || "Authentication failed");
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-foreground">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-border bg-surface/60 p-8 shadow-2xl backdrop-blur-xl">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border border-border-strong bg-surface-raised text-primary">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground">IMAM ESTUDIO OS</h1>
          <p className="mt-2 text-xs font-mono tracking-widest text-muted-foreground uppercase">
            Staff Access Control Plane
          </p>
        </div>

        {errorMsg ? (
          <div className="flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
            <ShieldAlert className="h-5 w-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        ) : null}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Email Address
            </label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full rounded-lg border border-border bg-background/80 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Password
            </label>
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-lg border border-border bg-background/80 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-primary disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign in to Control Plane"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          IMAM ESTUDIO OS • Secured with PostgreSQL RLS & RBAC
        </div>
      </div>
    </div>
  );
}
