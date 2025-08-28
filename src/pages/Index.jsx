import { useState, useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import Navigation from '../components/Navigation';
import Dashboard from '../components/Dashboard';
import AssetLibrary from '../components/AssetLibrary';
import Leaderboard from '../components/Leaderboard';
import MyBadges from '../components/MyBadges';
import { mockNotifications } from '../data/mockData';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'assets':
        return <AssetLibrary />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'badges':
        return <MyBadges />;
      case 'rentals':
        return (
          <div className="p-6 text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Rental Management</h1>
            <p className="text-xl text-muted-foreground">Coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6 text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Settings</h1>
            <p className="text-xl text-muted-foreground">Coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        notifications={notifications}
      />
      <main className="overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
