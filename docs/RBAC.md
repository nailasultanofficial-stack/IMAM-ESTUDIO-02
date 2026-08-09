# Role-Based Access Control (RBAC) Specification

## Architecture
Authorization is enforced server-side via PostgreSQL Row-Level Security (RLS) policies and SECURITY DEFINER predicate functions.

## Roles & Permissions Matrix
| Role | Public Content | Services/Projects | Theme/Pages | Leads CRM | Staff Management | Audit Logs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Anonymous** | Read Published | None | Read Published | Insert Only | None | None |
| **Viewer** | Read All | Read All | Read All | None | None | None |
| **Editor** | Read/Write | Full CRUD | Full CRUD | None | None | None |
| **Operations**| Read All | None | None | Full CRUD | None | None |
| **Admin** | Read/Write | Full CRUD | Full CRUD | Full CRUD | Read Staff | Read Logs |
| **Owner** | Full System | Full System | Full System | Full System | Full Role Grant | Full System |

## Helper Predicate Functions
- `public.has_role(_user_id, _role)`
- `public.has_any_role(_user_id, _roles)`
- `public.is_owner()`
- `public.is_admin()`
- `public.can_manage_content()`
- `public.can_manage_ops()`
- `public.can_read_content()`
