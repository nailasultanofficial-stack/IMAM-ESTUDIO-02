import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdminAuditLogs } from "@/lib/admin.functions";
import type { AuditLogEntry } from "@/lib/content-types";
import { History, Shield, Lock, Clock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/audit-logs")({
  head: () => ({
    meta: [
      { title: "Audit Logs — MALIK JAHANZAIB OS" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminAuditLogsPage,
});

function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const data = await getAdminAuditLogs({ data: {} });
      setLogs(data);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Security & Mutation Audit Trail
        </h1>
        <p className="mt-1 text-xs text-zinc-400 font-mono">
          Append-only audit log. Mutations are recorded via PostgreSQL{" "}
          <span className="text-emerald-400 font-bold">log_audit()</span> SECURITY DEFINER function.
        </p>
      </div>

      {loading ? (
        <p className="text-xs font-mono text-zinc-500 py-8">Loading audit trail...</p>
      ) : logs.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-12 text-center text-xs font-mono text-zinc-500">
          No audit logs recorded yet. All privileged mutations will appear here automatically.
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 font-mono uppercase bg-zinc-950/80">
                <th className="p-4">Timestamp</th>
                <th className="p-4">Actor</th>
                <th className="p-4">Action</th>
                <th className="p-4">Resource</th>
                <th className="p-4">Resource ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-mono">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-zinc-900/40">
                  <td className="p-4 text-zinc-400">{new Date(log.created_at).toLocaleString()}</td>
                  <td className="p-4 text-white font-semibold">{log.actor_email || "System"}</td>
                  <td className="p-4 text-emerald-400 font-bold">{log.action}</td>
                  <td className="p-4 text-zinc-300">{log.resource}</td>
                  <td className="p-4 text-zinc-500">{log.resource_id || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
