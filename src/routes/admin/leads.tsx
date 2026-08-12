import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdminLeads, updateAdminLeadStatus } from "@/lib/admin.functions";
import type { Lead, LeadStatus } from "@/lib/content-types";
import { LEAD_STATUSES } from "@/lib/content-types";
import { Users, Tag, MessageSquare, Mail, Phone, Calendar, Search, Filter, X } from "lucide-react";
import { toast } from "sonner";
import { whatsappUrl } from "@/lib/utils";

export const Route = createFileRoute("/admin/leads")({
  head: () => ({
    meta: [
      { title: "Leads CRM — MALIK JAHANZAIB OS" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLeadsPage,
});

function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [updating, setUpdating] = useState(false);

  const load = async () => {
    try {
      const data = await getAdminLeads({ data: {} });
      setLeads(data);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    setUpdating(true);
    try {
      await updateAdminLeadStatus({
        data: { id: leadId, status: newStatus },
      });
      toast.success(`Lead status updated to ${newStatus}`);
      if (selectedLead?.id === leadId) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
      await load();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setUpdating(false);
    }
  };

  const filteredLeads = leads.filter((l) => {
    const matchesStatus = filterStatus === "All" || l.status === filterStatus;
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Leads & Inquiries CRM</h1>
          <p className="mt-1 text-xs text-zinc-400 font-mono">
            Protected by PostgreSQL RLS. Anonymous users cannot read leads.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-zinc-400 mr-2">Status:</span>
          {["All", ...LEAD_STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`rounded-full px-3 py-1 text-xs font-mono transition-colors ${
                filterStatus === s
                  ? "bg-emerald-500 text-zinc-950 font-bold"
                  : "bg-zinc-950 text-zinc-400 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2 pl-9 pr-4 text-xs text-white placeholder-zinc-600 focus:outline-none"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-xs font-mono text-zinc-500 py-8">Loading CRM leads...</p>
      ) : (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 font-mono uppercase bg-zinc-950/80">
                <th className="p-4">Contact</th>
                <th className="p-4">Project Type</th>
                <th className="p-4">CTA Attribution</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredLeads.map((l) => (
                <tr
                  key={l.id}
                  className="hover:bg-zinc-900/40 cursor-pointer"
                  onClick={() => setSelectedLead(l)}
                >
                  <td className="p-4">
                    <div className="font-semibold text-white">{l.name}</div>
                    <div className="text-[0.7rem] text-zinc-400">{l.email}</div>
                  </td>
                  <td className="p-4 text-zinc-300">{l.project_type}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 rounded bg-zinc-950 px-2 py-0.5 font-mono text-[0.65rem] text-emerald-400 border border-zinc-800">
                      <Tag className="h-3 w-3" />
                      {l.source_cta}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={l.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleStatusChange(l.id, e.target.value as LeadStatus)}
                      className="rounded border border-zinc-800 bg-zinc-950 px-2 py-1 text-xs text-emerald-400 font-mono focus:outline-none"
                    >
                      {LEAD_STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4 text-zinc-500 font-mono">
                    {new Date(l.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLead(l);
                      }}
                      className="rounded bg-zinc-800 px-3 py-1 text-xs text-zinc-300 hover:bg-zinc-700"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Lead Detail Modal */}
      {selectedLead ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-100 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">{selectedLead.name}</h2>
                <p className="text-xs text-zinc-400 font-mono">{selectedLead.email}</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 rounded-lg bg-zinc-900/60 p-4">
                <div>
                  <span className="font-mono text-zinc-500 uppercase">Project Type</span>
                  <p className="font-semibold text-white mt-1">{selectedLead.project_type}</p>
                </div>
                <div>
                  <span className="font-mono text-zinc-500 uppercase">Budget</span>
                  <p className="font-semibold text-emerald-400 mt-1">
                    {selectedLead.budget || "Unspecified"}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-zinc-500 uppercase">CTA Source</span>
                  <p className="font-mono text-emerald-400 mt-1">{selectedLead.source_cta}</p>
                </div>
                <div>
                  <span className="font-mono text-zinc-500 uppercase">Submitted</span>
                  <p className="font-mono text-zinc-300 mt-1">
                    {new Date(selectedLead.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <span className="font-mono text-zinc-500 uppercase">Project Details / Message</span>
                <div className="mt-2 rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-zinc-200 whitespace-pre-wrap leading-relaxed">
                  {selectedLead.details}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-zinc-800">
                <a
                  href={`mailto:${selectedLead.email}?subject=RE: Project Inquiry — ${selectedLead.project_type}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded bg-zinc-800 py-2 font-semibold text-white hover:bg-zinc-700"
                >
                  <Mail className="h-4 w-4 text-emerald-400" />
                  Email Lead
                </a>
                <a
                  href={whatsappUrl(
                    "923091925177",
                    `Hi ${selectedLead.name}, following up on your ${selectedLead.project_type} inquiry with Malik Jahanzaib.`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded bg-emerald-500 py-2 font-semibold text-zinc-950 hover:bg-emerald-400"
                >
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp Direct
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
