-- ============================================================
-- 011_user_settings.sql
-- User-specific settings for notifications, AI agent, and appearance.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.user_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  notifications jsonb NOT NULL DEFAULT '{}'::jsonb,
  ai_agent jsonb NOT NULL DEFAULT '{}'::jsonb,
  appearance text NOT NULL DEFAULT 'system',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_settings_auth_id ON public.user_settings(auth_id);

ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_settings_select_own ON public.user_settings
  FOR SELECT TO authenticated
  USING (auth_id = auth.uid());

CREATE POLICY user_settings_insert_own ON public.user_settings
  FOR INSERT TO authenticated
  WITH CHECK (auth_id = auth.uid());

CREATE POLICY user_settings_update_own ON public.user_settings
  FOR UPDATE TO authenticated
  USING (auth_id = auth.uid());
