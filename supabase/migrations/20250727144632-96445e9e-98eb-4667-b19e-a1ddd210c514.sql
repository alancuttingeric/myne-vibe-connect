-- Fix RLS policies to allow user self-registration

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Admins can manage all users" ON public.users;

-- Create new policies that allow user creation
CREATE POLICY "Users can view their own data" 
ON public.users 
FOR SELECT 
USING (auth.uid() = id OR public.is_admin(auth.uid()));

CREATE POLICY "Users can create their own profile" 
ON public.users 
FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own data" 
ON public.users 
FOR UPDATE 
USING (auth.uid() = id OR public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage all users" 
ON public.users 
FOR ALL 
USING (public.is_admin(auth.uid()));

-- Fix activity logs policies to allow user activity creation
DROP POLICY IF EXISTS "Users can view their own activity" ON public.activity_logs;
DROP POLICY IF EXISTS "Admins can view all activity" ON public.activity_logs;

CREATE POLICY "Users can view their own activity" 
ON public.activity_logs 
FOR SELECT 
USING (user_id = auth.uid() OR public.is_admin(auth.uid()));

CREATE POLICY "Users can create their own activity logs" 
ON public.activity_logs 
FOR INSERT 
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage all activity logs" 
ON public.activity_logs 
FOR ALL 
USING (public.is_admin(auth.uid()));