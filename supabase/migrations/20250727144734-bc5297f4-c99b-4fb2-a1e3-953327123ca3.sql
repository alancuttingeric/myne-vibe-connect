-- Check and fix only missing RLS policies

-- First check if policy exists before dropping
DO $$
BEGIN
    -- Only add INSERT policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users' 
        AND policyname = 'Users can create their own profile'
        AND cmd = 'INSERT'
    ) THEN
        CREATE POLICY "Users can create their own profile" 
        ON public.users 
        FOR INSERT 
        WITH CHECK (auth.uid() = id);
    END IF;

    -- Add activity logs INSERT policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'activity_logs' 
        AND policyname = 'Users can create their own activity logs'
        AND cmd = 'INSERT'
    ) THEN
        CREATE POLICY "Users can create their own activity logs" 
        ON public.activity_logs 
        FOR INSERT 
        WITH CHECK (user_id = auth.uid());
    END IF;
END$$;