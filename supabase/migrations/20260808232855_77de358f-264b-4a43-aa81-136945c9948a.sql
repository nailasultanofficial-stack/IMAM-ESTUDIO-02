-- Lock every SECURITY DEFINER / internal function away from anon + PUBLIC
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.has_any_role(UUID, public.app_role[]) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_owner() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_staff() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.can_manage_content() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.can_manage_ops() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.can_read_content() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.log_audit(TEXT,TEXT,TEXT,JSONB) FROM PUBLIC, anon;

-- trigger-only functions: nobody calls these directly
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;

-- signed-in staff still need the predicates for RLS evaluation
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_any_role(UUID, public.app_role[]) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_owner() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_staff() TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_manage_content() TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_manage_ops() TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_read_content() TO authenticated;
GRANT EXECUTE ON FUNCTION public.log_audit(TEXT,TEXT,TEXT,JSONB) TO authenticated;
