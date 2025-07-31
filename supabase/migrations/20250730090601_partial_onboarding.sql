CREATE TABLE partial_onboarding (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    data JSONB,
    last_completed_step INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- was later updated to hold clerk id as is instead of supabase auth user id
-- alter table public.partial_onboarding
--   drop constraint partial_onboarding_user_id_fkey,      -- remove FK
--   alter column user_id type text using user_id::text;   -- cast uuid→text (works even if empty)
