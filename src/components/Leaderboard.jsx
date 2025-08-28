import { Crown, Medal, Award, TrendingUp, Trophy, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mockClients } from '../data/mockData';

const Leaderboard = () => {
  const engineHoursLeaders = mockClients.sort((a, b) => b.totalEngineHours - a.totalEngineHours);
  const efficiencyLeaders = mockClients.sort((a, b) => b.utilizationRate - a.utilizationRate);
  const activeLeaders = mockClients.sort((a, b) => b.rentalsThisMonth - a.rentalsThisMonth);
  const leastIdleLeaders = mockClients.sort((a, b) => a.idleHours - b.idleHours);

  const LeaderboardSection = ({ title, data, valueKey, formatValue, icon: Icon, description }) => {
    const podiumIcons = [Crown, Medal, Award];
    const podiumColors = ['text-achievement-gold', 'text-achievement-silver', 'text-achievement-bronze'];
    const bgColors = ['bg-achievement-gold/10', 'bg-achievement-silver/10', 'bg-achievement-bronze/10'];

    return (
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon className="h-5 w-5 text-primary" />
            <span>{title}</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.slice(0, 5).map((client, index) => {
            const PodiumIcon = podiumIcons[Math.min(index, 2)];
            const isTopThree = index < 3;
            
            return (
              <div key={client.id} className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8">
                  {isTopThree ? (
                    <div className={`p-1 rounded-full ${bgColors[index]}`}>
                      <PodiumIcon className={`h-4 w-4 ${podiumColors[index]}`} />
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium truncate">{client.name}</span>
                    <span className={`font-bold ${isTopThree ? podiumColors[index] : 'text-foreground'}`}>
                      {formatValue(client[valueKey])}
                    </span>
                  </div>
                  
                  {/* Progress bar for visual comparison */}
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-1000 ease-out ${
                        isTopThree ? 
                          (index === 0 ? 'bg-achievement-gold' :
                           index === 1 ? 'bg-achievement-silver' :
                           'bg-achievement-bronze') :
                          'bg-muted-foreground'
                      }`}
                      style={{ 
                        width: `${Math.min((client[valueKey] / data[0][valueKey]) * 100, 100)}%`,
                        transitionDelay: `${index * 100}ms`
                      }}
                    />
                  </div>
                </div>
                
                {/* Client avatar */}
                <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-xs font-semibold">
                  {client.avatar}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="text-center space-y-4 slide-in-up">
        <h1 className="text-4xl font-bold text-primary">Client Leaderboards</h1>
        <p className="text-lg text-muted-foreground">Top performing clients across key metrics</p>
      </div>

      {/* Leaderboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeaderboardSection
          title="Total Engine Hours"
          data={engineHoursLeaders}
          valueKey="totalEngineHours"
          formatValue={(value) => `${value.toLocaleString()}h`}
          icon={Clock}
          description="Clients ranked by total accumulated engine hours"
        />
        
        <LeaderboardSection
          title="Efficiency Masters"
          data={efficiencyLeaders}
          valueKey="utilizationRate"
          formatValue={(value) => `${value}%`}
          icon={TrendingUp}
          description="Highest utilization rates (engine vs idle hours)"
        />
        
        <LeaderboardSection
          title="Most Active This Month"
          data={activeLeaders}
          valueKey="rentalsThisMonth"
          formatValue={(value) => `${value} rentals`}
          icon={Trophy}
          description="Clients with the most equipment rentals this month"
        />
        
        <LeaderboardSection
          title="Least Idle Time"
          data={leastIdleLeaders}
          valueKey="idleHours"
          formatValue={(value) => `${value}h idle`}
          icon={Medal}
          description="Clients with minimal equipment idle time"
        />
      </div>

      {/* Overall Stats */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Overall Statistics</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {mockClients.reduce((sum, client) => sum + client.totalEngineHours, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Engine Hours</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {(mockClients.reduce((sum, client) => sum + client.utilizationRate, 0) / mockClients.length).toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground">Average Utilization</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">
              {mockClients.reduce((sum, client) => sum + client.rentalsThisMonth, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Rentals This Month</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">
              {mockClients.reduce((sum, client) => sum + client.idleHours, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Idle Hours</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;