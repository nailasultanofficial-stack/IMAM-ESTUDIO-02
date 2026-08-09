# Security Audit & Hardening Guidelines

## Core Hardening Practices
1. **No Service-Role Leak**: `SUPABASE_SERVICE_ROLE_KEY` is NEVER exposed to client-side code or bundled into Vite output.
2. **Anonymous Isolation**: Anonymous users have `INSERT-ONLY` access to `leads`. Anonymous users cannot SELECT or read leads back.
3. **Audit Log Integrity**: Audit logs are append-only. The `audit_logs` table has no `UPDATE` or `DELETE` RLS policies.
4. **No Auth Recursion**: All RLS predicate functions are marked `SECURITY DEFINER SET search_path = public` to avoid policy recursion loops.
5. **Schema Cache Protection**: Client-side queries use the unprivileged publishable key.
