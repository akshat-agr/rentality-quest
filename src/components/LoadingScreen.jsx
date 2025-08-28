import { useEffect, useState } from 'react';
import { Settings, Cog } from 'lucide-react';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('Initializing Systems...');

  const loadingTexts = [
    'Initializing Systems...',
    'Loading Equipment Data...',
    'Connecting to Fleet Network...',
    'Preparing Dashboard...',
    'Welcome to SmartRent!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        
        // Update text based on progress
        if (newProgress >= 20 && newProgress < 40) setCurrentText(loadingTexts[1]);
        else if (newProgress >= 40 && newProgress < 60) setCurrentText(loadingTexts[2]);
        else if (newProgress >= 60 && newProgress < 80) setCurrentText(loadingTexts[3]);
        else if (newProgress >= 80) setCurrentText(loadingTexts[4]);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        {/* Logo and Title */}
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="relative">
              <Settings className="w-12 h-12 text-primary loading-gear" />
              <Cog className="w-6 h-6 text-accent absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 loading-gear" style={{animationDirection: 'reverse', animationDuration: '1.5s'}} />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-primary">SmartRent</h1>
            <p className="text-xl text-muted-foreground">Fleet Command Center</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto space-y-4">
          <div className="bg-muted rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{currentText}</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;