import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageCircle, UserCheck, Activity, TrendingUp, Crown, Music, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface DashboardStats {
  totalUsers: number;
  pendingApprovals: number;
  totalMessages: number;
  recentActivity: number;
}

export const DashboardOverview = () => {
  const { userProfile } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    pendingApprovals: 0,
    totalMessages: 0,
    recentActivity: 0
  });
  const [loading, setLoading] = useState(true);

  const isAdmin = userProfile?.role === 'admin';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (isAdmin) {
          // Admin stats
          const [usersRes, pendingRes, messagesRes, activityRes] = await Promise.all([
            supabase.from('users').select('id', { count: 'exact' }),
            supabase.from('users').select('id', { count: 'exact' }).eq('status', 'pending'),
            supabase.from('messages').select('id', { count: 'exact' }),
            supabase.from('activity_logs').select('id', { count: 'exact' }).gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
          ]);

          setStats({
            totalUsers: usersRes.count || 0,
            pendingApprovals: pendingRes.count || 0,
            totalMessages: messagesRes.count || 0,
            recentActivity: activityRes.count || 0
          });
        } else {
          // Artist stats
          const [messagesRes, activityRes] = await Promise.all([
            supabase.from('messages').select('id', { count: 'exact' }).or(`sender_id.eq.${userProfile?.id},receiver_id.eq.${userProfile?.id}`),
            supabase.from('activity_logs').select('id', { count: 'exact' }).eq('user_id', userProfile?.id)
          ]);

          setStats({
            totalUsers: 0,
            pendingApprovals: 0,
            totalMessages: messagesRes.count || 0,
            recentActivity: activityRes.count || 0
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userProfile) {
      fetchStats();
    }
  }, [userProfile, isAdmin]);

  const adminCards = [
    {
      title: 'Total Artists',
      value: stats.totalUsers,
      icon: Users,
      description: 'Registered artists',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Pending Approvals',
      value: stats.pendingApprovals,
      icon: UserCheck,
      description: 'Artists awaiting approval',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Total Messages',
      value: stats.totalMessages,
      icon: MessageCircle,
      description: 'Chat messages exchanged',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Recent Activity',
      value: stats.recentActivity,
      icon: Activity,
      description: 'Actions in last 7 days',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const artistCards = [
    {
      title: 'Messages',
      value: stats.totalMessages,
      icon: MessageCircle,
      description: 'Total conversations',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Activity',
      value: stats.recentActivity,
      icon: Activity,
      description: 'Your actions',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Status',
      value: userProfile?.status === 'active' ? 'Active' : 'Pending',
      icon: userProfile?.status === 'active' ? TrendingUp : UserCheck,
      description: 'Account status',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const cards = isAdmin ? adminCards : artistCards;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-3">
          {isAdmin ? (
            <Crown className="w-12 h-12 text-primary neon-glow" />
          ) : (
            <Music className="w-12 h-12 text-primary neon-glow" />
          )}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-6 h-6 text-accent" />
          </motion.div>
        </div>
        <h1 className="text-4xl font-bold gradient-text">
          {isAdmin ? 'Admin Dashboard' : 'Artist Dashboard'}
        </h1>
        <p className="text-muted-foreground text-lg">
          {isAdmin 
            ? 'Manage your artist collective and oversee all operations' 
            : 'Welcome to your creative workspace'}
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="gradient-border hover-glow glass backdrop-blur-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${card.color}`}>
                  <card.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold gradient-text">
                  {loading ? '...' : card.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="gradient-border glass backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="gradient-text">Quick Actions</CardTitle>
            <CardDescription>
              {isAdmin ? 'Manage your platform efficiently' : 'Get started with your artistic journey'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isAdmin ? (
                <>
                  <motion.div 
                    className="p-4 border border-border/50 rounded-lg hover:bg-muted/20 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <UserCheck className="w-6 h-6 text-primary mb-2" />
                    <h3 className="font-medium">Review Applications</h3>
                    <p className="text-sm text-muted-foreground">Approve pending artists</p>
                  </motion.div>
                  <motion.div 
                    className="p-4 border border-border/50 rounded-lg hover:bg-muted/20 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageCircle className="w-6 h-6 text-secondary mb-2" />
                    <h3 className="font-medium">Live Chat</h3>
                    <p className="text-sm text-muted-foreground">Connect with artists</p>
                  </motion.div>
                  <motion.div 
                    className="p-4 border border-border/50 rounded-lg hover:bg-muted/20 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Activity className="w-6 h-6 text-accent mb-2" />
                    <h3 className="font-medium">View Activity</h3>
                    <p className="text-sm text-muted-foreground">Monitor platform activity</p>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div 
                    className="p-4 border border-border/50 rounded-lg hover:bg-muted/20 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Users className="w-6 h-6 text-primary mb-2" />
                    <h3 className="font-medium">Update Profile</h3>
                    <p className="text-sm text-muted-foreground">Manage your artist profile</p>
                  </motion.div>
                  <motion.div 
                    className="p-4 border border-border/50 rounded-lg hover:bg-muted/20 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageCircle className="w-6 h-6 text-secondary mb-2" />
                    <h3 className="font-medium">Chat with Admin</h3>
                    <p className="text-sm text-muted-foreground">Get support and guidance</p>
                  </motion.div>
                  <motion.div 
                    className="p-4 border border-border/50 rounded-lg hover:bg-muted/20 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Music className="w-6 h-6 text-accent mb-2" />
                    <h3 className="font-medium">Collaborations</h3>
                    <p className="text-sm text-muted-foreground">Explore opportunities</p>
                  </motion.div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};