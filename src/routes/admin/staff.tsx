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
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Staff & RBAC Role Management
        </h1>
        <p className="mt-1 text-xs text-muted-foreground font-mono">
          Only the <span className="text-amber-400 font-bold">Owner</span> can grant or revoke
          administrative roles in PostgreSQL.
        </p>
      </div>

      {/* Role Definitions Reference Card */}
      <div className="rounded-xl border border-border bg-surface/60 p-6">
        <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
          Role Access Privilege Hierarchy
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {(["owner", "admin", "editor", "operations", "viewer"] as AppRole[]).map((r) => (
            <div key={r} className="rounded-lg border border-border bg-background p-3">
              <span className="font-mono text-xs font-bold text-primary uppercase">{r}</span>
              <p className="mt-1.5 text-[0.7rem] text-muted-foreground leading-relaxed">
                {ROLE_DESCRIPTIONS[r]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-xs font-mono text-muted-foreground py-8">Loading staff members...</p>
      ) : (
        <div className="rounded-xl border border-border bg-surface/60 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground font-mono uppercase bg-background/80">
                <th className="p-4">Staff Member</th>
                <th className="p-4">Email</th>
                <th className="p-4">Assigned Roles</th>
                <th className="p-4">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {staff.map((s) => (
                <tr key={s.id} className="hover:bg-surface/40">
                  <td className="p-4 font-semibold text-foreground">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-raised text-xs font-bold text-primary">
                        {s.full_name?.substring(0, 2)?.toUpperCase() || "ST"}
                      </div>
                      <span>{s.full_name || "Staff User"}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground font-mono">{s.email}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1.5">
                      {s.roles.length === 0 ? (
                        <span className="text-muted-foreground font-mono">No role assigned</span>
                      ) : (
                        s.roles.map((role) => (
                          <span
                            key={role}
                            className="rounded border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[0.65rem] text-primary uppercase font-bold"
                          >
                            {role}
                          </span>
                        ))
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground font-mono">
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
