import { useState, useEffect } from 'react';
import { Trophy, X, Sparkles } from 'lucide-react';
import { mockNotifications } from '../data/mockData';

const NotificationBanner = () => {
  const [currentNotification, setCurrentNotification] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show achievement notifications
    const achievementNotifications = mockNotifications.filter(n => n.type === 'achievement' && !n.read);
    
    if (achievementNotifications.length > 0) {
      let index = 0;
      
      const showNext = () => {
        if (index < achievementNotifications.length) {
          setCurrentNotification(achievementNotifications[index]);
          setIsVisible(true);
          
          // Auto hide after 5 seconds
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
              index++;
              showNext();
            }, 300);
          }, 5000);
        }
      };
      
      // Start showing notifications after initial page load
      setTimeout(showNext, 2000);
    }
  }, []);

  if (!currentNotification || !isVisible) return null;

  return (
    <div className="fixed top-20 right-6 z-50 animate-slide-in-right">
      <div className="bg-card border border-primary/50 rounded-lg p-4 shadow-lg pulse-glow max-w-sm">
        <div className="flex items-start space-x-3">
          <div className="bg-primary/20 p-2 rounded-full">
            <Trophy className="h-5 w-5 text-primary" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-primary">Achievement Unlocked!</span>
            </div>
            <p className="text-sm text-foreground">{currentNotification.message}</p>
          </div>
          
          <button
            onClick={() => setIsVisible(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        {/* Animated progress bar */}
        <div className="mt-3 bg-muted rounded-full h-1 overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full animate-[width-reduce_5s_linear]"
            style={{
              animation: 'width-reduce 5s linear',
              '@keyframes width-reduce': {
                'from': { width: '100%' },
                'to': { width: '0%' }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationBanner;