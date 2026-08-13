import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdminDashboardMetrics } from "@/lib/admin.functions";
import {
  Users,
  DollarSign,
  Layers,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Tag,
} from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — IMAM ESTUDIO OS" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAdminDashboardMetrics({ data: {} });
        setMetrics(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center text-xs font-mono text-muted-foreground">
        Loading metrics from PostgreSQL...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Executive Dashboard</h1>
        <p className="mt-1 text-xs text-muted-foreground font-mono">
          Real-time metrics sourced from Supabase PostgreSQL.
        </p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-surface/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-mono uppercase tracking-wider">Total Leads</span>
            <Users className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-3 text-3xl font-bold text-foreground">{metrics?.leadCounts.total ?? 0}</p>
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="text-primary font-semibold">
              +{metrics?.leadCounts.new ?? 0} New
            </span>
            <span>in pipeline</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-mono uppercase tracking-wider">Paid Revenue</span>
            <DollarSign className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-3 text-3xl font-bold text-foreground">
            ${metrics?.revenueTotal?.toLocaleString() ?? 0}
          </p>
          <div className="mt-2 text-xs text-muted-foreground">
            <span>Pending Quotes: ${metrics?.pendingOrdersTotal?.toLocaleString() ?? 0}</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-mono uppercase tracking-wider">Live Capabilities</span>
            <Layers className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-3 text-3xl font-bold text-foreground">{metrics?.servicesCount ?? 0}</p>
          <p className="mt-2 text-xs text-muted-foreground">Published in database</p>
        </div>

        <div className="rounded-xl border border-border bg-surface/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-mono uppercase tracking-wider">Case Studies</span>
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-3 text-3xl font-bold text-foreground">{metrics?.projectsCount ?? 0}</p>
          <p className="mt-2 text-xs text-muted-foreground">Verified portfolio items</p>
        </div>
      </div>

      {/* Lead Pipeline breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface/60 p-6">
          <h2 className="text-sm font-semibold text-foreground tracking-wide uppercase font-mono mb-4">
            Lead Status Pipeline
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-border bg-background p-3 text-center">
              <span className="text-[0.7rem] text-muted-foreground uppercase font-mono">New</span>
              <p className="text-xl font-bold text-primary">{metrics?.leadCounts.new ?? 0}</p>
            </div>
            <div className="rounded-lg border border-border bg-background p-3 text-center">
              <span className="text-[0.7rem] text-muted-foreground uppercase font-mono">Contacted</span>
              <p className="text-xl font-bold text-blue-400">
                {metrics?.leadCounts.contacted ?? 0}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background p-3 text-center">
              <span className="text-[0.7rem] text-muted-foreground uppercase font-mono">Scoping</span>
              <p className="text-xl font-bold text-amber-400">
                {metrics?.leadCounts.inScoping ?? 0}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background p-3 text-center">
              <span className="text-[0.7rem] text-muted-foreground uppercase font-mono">Proposal</span>
              <p className="text-xl font-bold text-purple-400">
                {metrics?.leadCounts.proposal ?? 0}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background p-3 text-center">
              <span className="text-[0.7rem] text-muted-foreground uppercase font-mono">Closed</span>
              <p className="text-xl font-bold text-primary">
                {metrics?.leadCounts.closed ?? 0}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background p-3 text-center">
              <span className="text-[0.7rem] text-muted-foreground uppercase font-mono">Archived</span>
              <p className="text-xl font-bold text-muted-foreground">{metrics?.leadCounts.archived ?? 0}</p>
            </div>
          </div>
        </div>

        {/* CTA Attribution */}
        <div className="rounded-xl border border-border bg-surface/60 p-6">
          <h2 className="text-sm font-semibold text-foreground tracking-wide uppercase font-mono mb-4">
            CTA Source Attribution
          </h2>
          <div className="space-y-3">
            {Object.entries(metrics?.ctaAttribution || {}).length === 0 ? (
              <p className="text-xs text-muted-foreground font-mono py-4">
                No CTA lead sources recorded yet.
              </p>
            ) : (
              Object.entries(metrics?.ctaAttribution || {}).map(([src, count]: [string, any]) => (
                <div
                  key={src}
                  className="flex items-center justify-between rounded-lg bg-background px-3 py-2 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Tag className="h-3.5 w-3.5 text-primary" />
                    <span className="font-mono text-muted-foreground">{src}</span>
                  </div>
                  <span className="font-bold text-foreground">{count} leads</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity List */}
      <div className="rounded-xl border border-border bg-surface/60 p-6">
        <h2 className="text-sm font-semibold text-foreground tracking-wide uppercase font-mono mb-4">
          Recent Lead Submissions
        </h2>
        {metrics?.recentLeads.length === 0 ? (
          <p className="text-xs text-muted-foreground font-mono py-4">No lead submissions in database.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground font-mono uppercase">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Project Type</th>
                  <th className="pb-3">CTA Source</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {metrics?.recentLeads.map((lead: any) => (
                  <tr key={lead.id} className="hover:bg-surface/40">
                    <td className="py-3 font-semibold text-foreground">{lead.name}</td>
                    <td className="py-3 text-muted-foreground">{lead.email}</td>
                    <td className="py-3 text-muted-foreground">{lead.project_type}</td>
                    <td className="py-3 font-mono text-primary">{lead.source_cta}</td>
                    <td className="py-3">
                      <span className="rounded border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[0.65rem] text-primary">
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
