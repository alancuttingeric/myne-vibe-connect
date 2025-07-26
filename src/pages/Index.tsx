import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Crown, Sparkles, Music, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-40 h-40 rounded-full opacity-20"
          style={{ background: 'linear-gradient(135deg, hsl(292 84% 61%), hsl(264 100% 64%))' }}
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-60 h-60 rounded-full opacity-15"
          style={{ background: 'linear-gradient(135deg, hsl(196 100% 50%), hsl(142 76% 56%))' }}
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="text-center space-y-8 relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex justify-center items-center space-x-4">
            <Crown className="w-16 h-16 text-primary neon-glow" />
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-accent" />
            </motion.div>
            <Music className="w-16 h-16 text-secondary neon-glow" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold gradient-text pulse-neon">
            MYNE WINNER
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Premium Artist Collective Dashboard - Where creativity meets professional excellence
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-4"
        >
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group">
              Enter Dashboard
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <p className="text-sm text-muted-foreground">
            Join the exclusive community of professional artists
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
