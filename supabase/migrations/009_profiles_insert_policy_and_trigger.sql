-- ============================================================
-- 009_profiles_insert_policy_and_trigger.sql
-- 1) Secure INSERT policy: an authenticated user can insert
--    ONLY their own profile row (auth_id must equal auth.uid()).
-- 2) Auto-create a profile whenever a new user signs up in
--    auth.users, seeding full_name/email from the signup
--    metadata. Verified: NO such trigger existed before, so
--    this is not a duplicate creation mechanism.
-- ============================================================

-- Secure INSERT policy (deliberately NOT "WITH CHECK (true)")
CREATE POLICY profiles_insert_own ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (auth_id = auth.uid());

-- Function runs as SECURITY DEFINER (table owner), which is the
-- standard Supabase pattern because the INSERT happens during
-- signup before the user has an authenticated session/JWT.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (auth_id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(
      NULLIF(NEW.raw_user_meta_data ->> 'full_name', ''),
      NULLIF(NEW.raw_user_meta_data ->> 'name', ''),
      split_part(COALESCE(NEW.email, ''), '@', 1)
    ),
    NEW.email
  )
  ON CONFLICT (auth_id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();