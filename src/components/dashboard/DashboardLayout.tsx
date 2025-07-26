import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardSidebar } from './DashboardSidebar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const DashboardLayout = () => {
  const { signOut, userProfile } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <motion.header 
            className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-40"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="hover:bg-muted/50 transition-colors" />
                <div>
                  <h1 className="text-xl font-semibold text-foreground">
                    Welcome back, {userProfile?.name}
                  </h1>
                  <p className="text-sm text-muted-foreground capitalize">
                    {userProfile?.role} Dashboard
                  </p>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={signOut}
                className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </motion.header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};