import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Mail, 
  MessageCircle, 
  Activity, 
  Settings,
  Crown,
  Sparkles,
  Music,
  FileText
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const adminMenuItems = [
  { title: 'Overview', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Pending Approvals', url: '/dashboard/approvals', icon: UserCheck },
  { title: 'Artists', url: '/dashboard/artists', icon: Users },
  { title: 'Invitations', url: '/dashboard/invitations', icon: Mail },
  { title: 'Live Chat', url: '/dashboard/chat', icon: MessageCircle },
  { title: 'Activity Logs', url: '/dashboard/activity', icon: Activity },
  { title: 'Settings', url: '/dashboard/settings', icon: Settings },
];

const artistMenuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Profile', url: '/dashboard/profile', icon: Users },
  { title: 'Collaborations', url: '/dashboard/collaborations', icon: FileText },
  { title: 'Chat', url: '/dashboard/chat', icon: MessageCircle },
  { title: 'Activity', url: '/dashboard/activity', icon: Activity },
];

export const DashboardSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const { userProfile } = useAuth();
  
  const currentPath = location.pathname;
  const isAdmin = userProfile?.role === 'admin';
  const menuItems = isAdmin ? adminMenuItems : artistMenuItems;
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return currentPath === '/dashboard';
    }
    return currentPath.startsWith(path);
  };

  const getNavClassName = (path: string) => {
    const active = isActive(path);
    return `w-full justify-start transition-all duration-300 ${
      active 
        ? 'bg-primary/20 text-primary border-primary/30 border neon-glow' 
        : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
    }`;
  };

  return (
    <Sidebar
      className={`${collapsed ? 'w-16' : 'w-64'} border-r border-border/50 bg-background/80 backdrop-blur-xl transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        {/* Header */}
        <motion.div 
          className="flex items-center space-x-3 mb-8 p-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <Crown className="w-8 h-8 text-primary neon-glow" />
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-3 h-3 text-accent" />
            </motion.div>
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-bold gradient-text">MYNE WINNER</h2>
              <p className="text-xs text-muted-foreground">
                {isAdmin ? 'Admin Portal' : 'Artist Dashboard'}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Navigation */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-muted-foreground mb-4">
              {isAdmin ? 'Admin Controls' : 'Artist Tools'}
            </SidebarGroupLabel>
          )}
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={getNavClassName(item.url)}
                        end={item.url === '/dashboard'}
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center w-full"
                        >
                          <item.icon className={`h-5 w-5 ${isActive(item.url) ? 'text-primary' : ''}`} />
                          {!collapsed && (
                            <span className="ml-3 font-medium">
                              {item.title}
                            </span>
                          )}
                        </motion.div>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Profile Section */}
        {!collapsed && userProfile && (
          <motion.div 
            className="mt-auto p-4 border-t border-border/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                {isAdmin ? (
                  <Crown className="w-5 h-5 text-white" />
                ) : (
                  <Music className="w-5 h-5 text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {userProfile.name}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {userProfile.role}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </SidebarContent>
    </Sidebar>
  );
};