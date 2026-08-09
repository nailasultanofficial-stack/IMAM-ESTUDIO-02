# API & Server Functions Reference

## Public Server Functions (`src/lib/public.functions.ts`)
- `getHomepage()`: Retrieves page metadata, active sections, published services, and featured projects in a single optimized request.
- `getServices()`: Fetches all published capabilities ordered by `display_order`.
- `getServiceBySlug({ slug })`: Fetches a single capability by unique slug.
- `getProjects()`: Fetches all published case studies ordered by `display_order`.
- `getProjectBySlug({ slug })`: Fetches a single case study by unique slug.
- `submitLead(LeadInput)`: Anonymous lead submission endpoint. Validated using Zod `leadSchema`.

## Admin Control Plane Functions (`src/lib/admin.functions.ts`)
- `getAdminDashboardMetrics()`: Retrieves lead counts, revenue totals, pending order metrics, and CTA attribution breakdown.
- `getAdminServices()` / `upsertAdminService()` / `deleteAdminService()`
- `getAdminProjects()` / `upsertAdminProject()` / `deleteAdminProject()`
- `getAdminThemeSections()` / `updateAdminSection()` / `reorderAdminSections()`
- `getAdminPages()` / `upsertAdminPage()`
- `getAdminLeads()` / `updateAdminLeadStatus()`
- `getAdminOrders()` / `upsertAdminOrder()`
- `getAdminMediaAssets()` / `upsertAdminMediaAsset()`
- `getAdminSeoSettings()` / `upsertAdminSeoSetting()`
- `getAdminStaffMembers()`
- `getAdminAuditLogs()`
