import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Sparkles, Crown } from 'lucide-react';

export const PendingApproval = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 rounded-full"
          style={{ background: 'linear-gradient(135deg, hsl(292 84% 61% / 0.1), hsl(264 100% 64% / 0.1))' }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-48 h-48 rounded-full"
          style={{ background: 'linear-gradient(135deg, hsl(196 100% 50% / 0.1), hsl(142 76% 56% / 0.1))' }}
          animate={{ 
            scale: [1, 0.8, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        <Card className="gradient-border glass backdrop-blur-xl text-center">
          <CardHeader className="space-y-6">
            <motion.div
              className="flex justify-center"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="relative">
                <Crown className="w-20 h-20 text-primary neon-glow" />
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-8 h-8 text-accent" />
                </motion.div>
              </div>
            </motion.div>
            
            <div>
              <CardTitle className="text-3xl font-bold gradient-text mb-2">
                MYNE WINNER
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Artist Application Pending
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <motion.div
              className="flex items-center justify-center space-x-3 text-accent"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Clock className="w-6 h-6" />
              <span className="text-lg font-medium">Under Review</span>
            </motion.div>

            <div className="space-y-4 text-muted-foreground">
              <p className="text-base leading-relaxed">
                Thank you for your interest in joining the MYNE WINNER artist collective!
              </p>
              
              <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                <p className="text-sm">
                  Your application is currently being reviewed by our admin team. 
                  You'll receive an email notification once your account has been approved.
                </p>
              </div>

              <p className="text-sm text-muted-foreground/80">
                This process typically takes 24-48 hours. Thank you for your patience!
              </p>
            </div>

            <motion.div
              className="flex justify-center space-x-2"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-primary"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};