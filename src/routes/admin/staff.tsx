import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdminStaffMembers } from "@/lib/admin.functions";
import type { StaffMember, AppRole } from "@/lib/content-types";
import { ROLE_DESCRIPTIONS } from "@/lib/content-types";
import { ShieldCheck, ShieldAlert, User, Lock, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/staff")({
  head: () => ({
    meta: [
      { title: "Staff & RBAC — IMAM ESTUDIO OS" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminStaffPage,
});

function AdminStaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const data = await getAdminStaffMembers({ data: {} });
      setStaff(data);
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
          Staff & RBAC Role Management
        </h1>
        <p className="mt-1 text-xs text-zinc-400 font-mono">
          Only the <span className="text-amber-400 font-bold">Owner</span> can grant or revoke
          administrative roles in PostgreSQL.
        </p>
      </div>

      {/* Role Definitions Reference Card */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
        <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4">
          Role Access Privilege Hierarchy
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {(["owner", "admin", "editor", "operations", "viewer"] as AppRole[]).map((r) => (
            <div key={r} className="rounded-lg border border-zinc-800 bg-zinc-950 p-3">
              <span className="font-mono text-xs font-bold text-emerald-400 uppercase">{r}</span>
              <p className="mt-1.5 text-[0.7rem] text-zinc-400 leading-relaxed">
                {ROLE_DESCRIPTIONS[r]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-xs font-mono text-zinc-500 py-8">Loading staff members...</p>
      ) : (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 font-mono uppercase bg-zinc-950/80">
                <th className="p-4">Staff Member</th>
                <th className="p-4">Email</th>
                <th className="p-4">Assigned Roles</th>
                <th className="p-4">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {staff.map((s) => (
                <tr key={s.id} className="hover:bg-zinc-900/40">
                  <td className="p-4 font-semibold text-white">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-emerald-400">
                        {s.full_name?.substring(0, 2)?.toUpperCase() || "ST"}
                      </div>
                      <span>{s.full_name || "Staff User"}</span>
                    </div>
                  </td>
                  <td className="p-4 text-zinc-300 font-mono">{s.email}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1.5">
                      {s.roles.length === 0 ? (
                        <span className="text-zinc-600 font-mono">No role assigned</span>
                      ) : (
                        s.roles.map((role) => (
                          <span
                            key={role}
                            className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[0.65rem] text-emerald-400 uppercase font-bold"
                          >
                            {role}
                          </span>
                        ))
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-zinc-500 font-mono">
                    {new Date(s.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
