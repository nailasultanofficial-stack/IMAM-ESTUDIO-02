import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard,
  Briefcase,
  Layers,
  Palette,
  FileText,
  Users,
  ShoppingBag,
  Image as ImageIcon,
  Search,
  ShieldCheck,
  History,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Control Plane — MALIK JAHANZAIB OS" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

const NAV_ITEMS = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Services", to: "/admin/services", icon: Layers },
  { label: "Projects", to: "/admin/projects", icon: Briefcase },
  { label: "Theme Editor", to: "/admin/theme-editor", icon: Palette },
  { label: "Pages", to: "/admin/pages", icon: FileText },
  { label: "Leads CRM", to: "/admin/leads", icon: Users },
  { label: "Orders & Quotes", to: "/admin/orders", icon: ShoppingBag },
  { label: "Media Library", to: "/admin/media", icon: ImageIcon },
  { label: "SEO Manager", to: "/admin/seo", icon: Search },
  { label: "Staff & RBAC", to: "/admin/staff", icon: ShieldCheck },
  { label: "Audit Logs", to: "/admin/audit-logs", icon: History },
];

function AdminLayout() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // If on login route, don't block
    if (pathname === "/admin/login") {
      setLoading(false);
      return;
    }

    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate({ to: "/admin/login" });
        return;
      }
      setUser(session.user);
      setLoading(false);
    }

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && pathname !== "/admin/login") {
        navigate({ to: "/admin/login" });
      } else if (session) {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, navigate]);

  if (pathname === "/admin/login") {
    return <Outlet />;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-400">
        <div className="flex items-center gap-3 font-mono text-sm">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
          <span>Verifying Authorization...</span>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {/* Sidebar Desktop */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-zinc-800/80 bg-zinc-950 p-4 lg:flex">
        <div className="flex items-center justify-between px-3 py-3 border-b border-zinc-800/60 pb-4">
          <div>
            <span className="font-bold text-white tracking-tight">MALIK JAHANZAIB</span>
            <span className="ml-2 rounded border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-[0.65rem] font-mono text-emerald-400">
              OS
            </span>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
            title="View Live Public Site"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <nav className="mt-6 flex-1 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.to || (item.to !== "/admin" && pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                  active
                    ? "bg-zinc-800/80 text-emerald-400 font-semibold"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-zinc-800/80 pt-4">
          <div className="mb-3 px-3">
            <p className="text-[0.7rem] font-mono text-zinc-500 truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-zinc-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Menu */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-zinc-950 p-6 lg:hidden">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <span className="font-bold text-white">MALIK JAHANZAIB OS</span>
            <button onClick={() => setMobileOpen(false)} className="text-zinc-400">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-6 flex-1 space-y-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-900"
                >
                  <Icon className="h-5 w-5 text-emerald-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center justify-between border-b border-zinc-800/80 bg-zinc-950 px-6 lg:justify-end">
          <button onClick={() => setMobileOpen(true)} className="text-zinc-400 lg:hidden">
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Production Active
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-zinc-950 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
