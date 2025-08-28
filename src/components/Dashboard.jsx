import { useState, useEffect } from 'react';
import { Trophy, Target, Flame, Zap, HandShake, TrendingUp, Clock, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { mockClients, mockEquipment, mockAchievements, equipmentTypes } from '../data/mockData';
import LeaderboardCard from './LeaderboardCard';
import EquipmentChart from './EquipmentChart';
import NotificationBanner from './NotificationBanner';

const iconMap = {
  trophy: Trophy,
  target: Target,
  flame: Flame,
  zap: Zap,
  handshake: HandShake
};

const Dashboard = () => {
  const [activeView, setActiveView] = useState('overview');
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setAnimateStats(true), 300);
  }, []);

  const totalAssets = equipmentTypes.reduce((sum, type) => sum + type.total, 0);
  const activeAssets = equipmentTypes.reduce((sum, type) => sum + type.active, 0);
  const maintenanceAssets = equipmentTypes.reduce((sum, type) => sum + type.maintenance, 0);
  
  const utilizationRate = ((activeAssets / totalAssets) * 100).toFixed(1);

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="text-center space-y-4 slide-in-up">
        <h1 className="text-4xl font-bold text-primary">Fleet Command Center</h1>
        <div className="flex justify-center space-x-4">
          <Button
            variant={activeView === 'overview' ? 'default' : 'ghost'}
            onClick={() => setActiveView('overview')}
            className="px-6"
          >
            Overview
          </Button>
          <Button
            variant={activeView === 'live' ? 'default' : 'ghost'}
            onClick={() => setActiveView('live')}
            className="px-6"
          >
            Live Assets
          </Button>
        </div>
      </div>

      {/* Notification Banner */}
      <NotificationBanner />

      {activeView === 'overview' && (
        <>
          {/* Key Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className={`card-hover ${animateStats ? 'slide-in-up' : 'opacity-0'}`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Assets</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{totalAssets}</div>
                <p className="text-xs text-success mt-1">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +5.2% from last month
                </p>
              </CardContent>
            </Card>

            <Card className={`card-hover ${animateStats ? 'slide-in-up' : 'opacity-0'}`} style={{animationDelay: '0.1s'}}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Assets</CardTitle>
                <Zap className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success">{activeAssets}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {utilizationRate}% utilization rate
                </p>
              </CardContent>
            </Card>

            <Card className={`card-hover ${animateStats ? 'slide-in-up' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">In Maintenance</CardTitle>
                <Clock className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-warning">{maintenanceAssets}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Scheduled maintenance
                </p>
              </CardContent>
            </Card>

            <Card className={`card-hover ${animateStats ? 'slide-in-up' : 'opacity-0'}`} style={{animationDelay: '0.3s'}}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Top Client</CardTitle>
                <Trophy className="h-4 w-4 text-achievement-gold" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-foreground">Metro Infra</div>
                <p className="text-xs text-muted-foreground mt-1">
                  2,100 engine hours
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Leaderboards */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <LeaderboardCard
                  title="Engine Hours Leaders"
                  data={mockClients.sort((a, b) => b.totalEngineHours - a.totalEngineHours).slice(0, 3)}
                  valueKey="totalEngineHours"
                  formatValue={(value) => `${value}h`}
                  delay="0.4s"
                />
                
                <LeaderboardCard
                  title="Efficiency Masters"
                  data={mockClients.sort((a, b) => b.utilizationRate - a.utilizationRate).slice(0, 3)}
                  valueKey="utilizationRate"
                  formatValue={(value) => `${value}%`}
                  delay="0.5s"
                />
                
                <LeaderboardCard
                  title="Most Active This Month"
                  data={mockClients.sort((a, b) => b.rentalsThisMonth - a.rentalsThisMonth).slice(0, 3)}
                  valueKey="rentalsThisMonth"
                  formatValue={(value) => `${value} rentals`}
                  delay="0.6s"
                />
              </div>

              {/* Equipment Usage Chart */}
              <EquipmentChart equipmentTypes={equipmentTypes} />
            </div>

            {/* Top Achievements */}
            <div className="space-y-6">
              <Card className="card-hover fade-in-delay">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-achievement-gold" />
                    <span>Recent Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(mockAchievements).slice(0, 4).map(([key, achievement]) => {
                    const IconComponent = iconMap[achievement.icon];
                    return (
                      <div key={key} className={`achievement-badge ${achievement.tier} p-3`}>
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${
                            achievement.tier === 'gold' ? 'bg-achievement-gold/20' :
                            achievement.tier === 'silver' ? 'bg-achievement-silver/20' :
                            'bg-achievement-bronze/20'
                          }`}>
                            <IconComponent className={`h-4 w-4 ${
                              achievement.tier === 'gold' ? 'text-achievement-gold' :
                              achievement.tier === 'silver' ? 'text-achievement-silver' :
                              'text-achievement-bronze'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{achievement.name}</h4>
                            <p className="text-xs text-muted-foreground">{achievement.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Utilization Progress */}
              <Card className="card-hover fade-in-delay">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-primary" />
                    <span>Client Utilization</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockClients.slice(0, 4).map((client) => (
                    <div key={client.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{client.name}</span>
                        <span className="text-muted-foreground">{client.utilizationRate}%</span>
                      </div>
                      <Progress 
                        value={client.utilizationRate} 
                        className={`h-2 ${
                          client.utilizationRate >= 95 ? 'progress-excellent' :
                          client.utilizationRate >= 85 ? 'progress-good' :
                          client.utilizationRate >= 70 ? 'progress-average' :
                          'progress-poor'
                        }`}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}

      {activeView === 'live' && (
        <div className="space-y-6">
          {/* Live Assets Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-primary">Live Asset List</h2>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Activity className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button>
                Next →
              </Button>
            </div>
          </div>

          <div className="text-muted-foreground mb-4">
            Assets Assigned to Sites: {mockEquipment.length}
          </div>

          {/* Equipment Table */}
          <Card className="card-hover">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-primary">
                      <th className="text-left p-4 text-primary-foreground font-semibold">Equipment ID</th>
                      <th className="text-left p-4 text-primary-foreground font-semibold">Site ID</th>
                      <th className="text-left p-4 text-primary-foreground font-semibold">Site Type</th>
                      <th className="text-left p-4 text-primary-foreground font-semibold">Region</th>
                      <th className="text-left p-4 text-primary-foreground font-semibold">Check-in Date</th>
                      <th className="text-left p-4 text-primary-foreground font-semibold">Checkout Date</th>
                      <th className="text-left p-4 text-primary-foreground font-semibold">Status</th>
                      <th className="text-left p-4 text-primary-foreground font-semibold">Engine Hours/Day</th>
                      <th className="text-left p-4 text-primary-foreground font-semibold">Operating Days/Month</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockEquipment.map((equipment) => (
                      <tr key={equipment.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="p-4 font-semibold text-primary">{equipment.id}</td>
                        <td className="p-4 text-accent font-semibold">{equipment.siteId}</td>
                        <td className="p-4">{equipment.type}</td>
                        <td className="p-4">{equipment.region}</td>
                        <td className="p-4">{equipment.checkInDate}</td>
                        <td className="p-4">{equipment.checkOutDate}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            equipment.status === 'active' ? 'bg-success/20 text-success' :
                            equipment.status === 'maintenance' ? 'bg-destructive/20 text-destructive' :
                            'bg-warning/20 text-warning'
                          }`}>
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              equipment.status === 'active' ? 'bg-success' :
                              equipment.status === 'maintenance' ? 'bg-destructive' :
                              'bg-warning'
                            }`} />
                            {equipment.status.charAt(0).toUpperCase() + equipment.status.slice(1)}
                          </span>
                        </td>
                        <td className="p-4">{equipment.engineHoursPerDay}</td>
                        <td className="p-4">{equipment.operatingDays}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-muted-foreground">
            Page 1 of 10
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;