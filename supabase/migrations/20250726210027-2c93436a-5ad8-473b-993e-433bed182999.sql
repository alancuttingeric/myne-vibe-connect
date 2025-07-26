-- Create any missing enums
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_status') THEN
        CREATE TYPE public.user_status AS ENUM ('pending', 'active', 'rejected');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'invitation_status') THEN
        CREATE TYPE public.invitation_status AS ENUM ('pending', 'used');
    END IF;
END $$;

-- Complete any missing tables
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users') THEN
        CREATE TABLE public.users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            role user_role NOT NULL DEFAULT 'artist',
            status user_status NOT NULL DEFAULT 'pending',
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            profile_image TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'invitations') THEN
        CREATE TABLE public.invitations (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            email TEXT NOT NULL,
            token TEXT UNIQUE NOT NULL,
            status invitation_status NOT NULL DEFAULT 'pending',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'messages') THEN
        CREATE TABLE public.messages (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            sender_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
            receiver_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );
    END IF;
    
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'activity_logs') THEN
        CREATE TABLE public.activity_logs (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
            action TEXT NOT NULL,
            metadata JSONB DEFAULT '{}',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
        );
    END IF;
END $$;

-- Ensure the admin user exists
INSERT INTO public.users (role, status, name, email)
VALUES ('admin', 'active', 'MYNE WINNER Admin', 'myne7x@gmail.com')
ON CONFLICT (email) DO NOTHING;