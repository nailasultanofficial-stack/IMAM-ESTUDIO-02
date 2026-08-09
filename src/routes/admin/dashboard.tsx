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
      { title: "Dashboard — MALIK JAHANZAIB OS" },
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
      <div className="py-12 text-center text-xs font-mono text-zinc-500">
        Loading metrics from PostgreSQL...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Executive Dashboard</h1>
        <p className="mt-1 text-xs text-zinc-400 font-mono">
          Real-time metrics sourced from Supabase PostgreSQL.
        </p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono uppercase tracking-wider">Total Leads</span>
            <Users className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="mt-3 text-3xl font-bold text-white">{metrics?.leadCounts.total ?? 0}</p>
          <div className="mt-2 flex items-center gap-2 text-xs text-zinc-400">
            <span className="text-emerald-400 font-semibold">
              +{metrics?.leadCounts.new ?? 0} New
            </span>
            <span>in pipeline</span>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono uppercase tracking-wider">Paid Revenue</span>
            <DollarSign className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="mt-3 text-3xl font-bold text-white">
            ${metrics?.revenueTotal?.toLocaleString() ?? 0}
          </p>
          <div className="mt-2 text-xs text-zinc-400">
            <span>Pending Quotes: ${metrics?.pendingOrdersTotal?.toLocaleString() ?? 0}</span>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono uppercase tracking-wider">Live Capabilities</span>
            <Layers className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="mt-3 text-3xl font-bold text-white">{metrics?.servicesCount ?? 0}</p>
          <p className="mt-2 text-xs text-zinc-400">Published in database</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-mono uppercase tracking-wider">Case Studies</span>
            <Briefcase className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="mt-3 text-3xl font-bold text-white">{metrics?.projectsCount ?? 0}</p>
          <p className="mt-2 text-xs text-zinc-400">Verified portfolio items</p>
        </div>
      </div>

      {/* Lead Pipeline breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h2 className="text-sm font-semibold text-white tracking-wide uppercase font-mono mb-4">
            Lead Status Pipeline
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-center">
              <span className="text-[0.7rem] text-zinc-400 uppercase font-mono">New</span>
              <p className="text-xl font-bold text-emerald-400">{metrics?.leadCounts.new ?? 0}</p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-center">
              <span className="text-[0.7rem] text-zinc-400 uppercase font-mono">Contacted</span>
              <p className="text-xl font-bold text-blue-400">
                {metrics?.leadCounts.contacted ?? 0}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-center">
              <span className="text-[0.7rem] text-zinc-400 uppercase font-mono">Scoping</span>
              <p className="text-xl font-bold text-amber-400">
                {metrics?.leadCounts.inScoping ?? 0}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-center">
              <span className="text-[0.7rem] text-zinc-400 uppercase font-mono">Proposal</span>
              <p className="text-xl font-bold text-purple-400">
                {metrics?.leadCounts.proposal ?? 0}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-center">
              <span className="text-[0.7rem] text-zinc-400 uppercase font-mono">Closed</span>
              <p className="text-xl font-bold text-emerald-500">
                {metrics?.leadCounts.closed ?? 0}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-center">
              <span className="text-[0.7rem] text-zinc-400 uppercase font-mono">Archived</span>
              <p className="text-xl font-bold text-zinc-500">{metrics?.leadCounts.archived ?? 0}</p>
            </div>
          </div>
        </div>

        {/* CTA Attribution */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h2 className="text-sm font-semibold text-white tracking-wide uppercase font-mono mb-4">
            CTA Source Attribution
          </h2>
          <div className="space-y-3">
            {Object.entries(metrics?.ctaAttribution || {}).length === 0 ? (
              <p className="text-xs text-zinc-500 font-mono py-4">
                No CTA lead sources recorded yet.
              </p>
            ) : (
              Object.entries(metrics?.ctaAttribution || {}).map(([src, count]: [string, any]) => (
                <div
                  key={src}
                  className="flex items-center justify-between rounded-lg bg-zinc-950 px-3 py-2 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Tag className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="font-mono text-zinc-300">{src}</span>
                  </div>
                  <span className="font-bold text-white">{count} leads</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity List */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
        <h2 className="text-sm font-semibold text-white tracking-wide uppercase font-mono mb-4">
          Recent Lead Submissions
        </h2>
        {metrics?.recentLeads.length === 0 ? (
          <p className="text-xs text-zinc-500 font-mono py-4">No lead submissions in database.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 font-mono uppercase">
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
                  <tr key={lead.id} className="hover:bg-zinc-900/40">
                    <td className="py-3 font-semibold text-white">{lead.name}</td>
                    <td className="py-3 text-zinc-400">{lead.email}</td>
                    <td className="py-3 text-zinc-300">{lead.project_type}</td>
                    <td className="py-3 font-mono text-emerald-400">{lead.source_cta}</td>
                    <td className="py-3">
                      <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[0.65rem] text-emerald-400">
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 text-zinc-500">
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
