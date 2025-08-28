import { Trophy, Target, Flame, Zap, Handshake, Star, Award, Medal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { mockClients, mockAchievements } from '../data/mockData';

const iconMap = {
  trophy: Trophy,
  target: Target,
  flame: Flame,
  zap: Zap,
  handshake: Handshake,
  star: Star
};

const MyBadges = () => {
  // Get the first client as the current user (for demo purposes)
  const currentUser = mockClients[0];
  const allAchievements = Object.entries(mockAchievements);
  const userAchievements = currentUser.achievements;
  
  // Separate earned and available achievements
  const earnedAchievements = allAchievements.filter(([key]) => userAchievements.includes(key));
  const availableAchievements = allAchievements.filter(([key]) => !userAchievements.includes(key));

  const getBadgeStats = () => {
    const gold = earnedAchievements.filter(([, achievement]) => achievement.tier === 'gold').length;
    const silver = earnedAchievements.filter(([, achievement]) => achievement.tier === 'silver').length;
    const bronze = earnedAchievements.filter(([, achievement]) => achievement.tier === 'bronze').length;
    
    return { gold, silver, bronze, total: earnedAchievements.length };
  };

  const stats = getBadgeStats();

  const AchievementBadge = ({ achievementKey, achievement, isEarned }) => {
    const IconComponent = iconMap[achievement.icon] || Trophy;
    
    return (
      <Card className={`achievement-badge ${achievement.tier} ${isEarned ? '' : 'opacity-50'} card-hover`}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-full ${
              achievement.tier === 'gold' ? 'bg-achievement-gold/20' :
              achievement.tier === 'silver' ? 'bg-achievement-silver/20' :
              'bg-achievement-bronze/20'
            }`}>
              <IconComponent className={`h-6 w-6 ${
                achievement.tier === 'gold' ? 'text-achievement-gold' :
                achievement.tier === 'silver' ? 'text-achievement-silver' :
                'text-achievement-bronze'
              }`} />
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{achievement.name}</h3>
              <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
              
              {isEarned && (
                <div className="flex items-center space-x-2 text-xs">
                  <Award className="h-3 w-3 text-success" />
                  <span className="text-success">Unlocked {achievement.unlockedAt}</span>
                </div>
              )}
              
              {!isEarned && (
                <div className="text-xs text-muted-foreground">
                  🔒 Not yet unlocked
                </div>
              )}
            </div>
            
            {/* Tier indicator */}
            <div className="text-right">
              <div className={`text-xs font-bold ${
                achievement.tier === 'gold' ? 'text-achievement-gold' :
                achievement.tier === 'silver' ? 'text-achievement-silver' :
                'text-achievement-bronze'
              }`}>
                {achievement.tier.toUpperCase()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="text-center space-y-4 slide-in-up">
        <h1 className="text-4xl font-bold text-primary">My Achievements</h1>
        <p className="text-lg text-muted-foreground">Track your progress and unlock new badges</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-hover">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Badges</div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-achievement-gold">{stats.gold}</div>
            <div className="text-sm text-muted-foreground">Gold Badges</div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-achievement-silver">{stats.silver}</div>
            <div className="text-sm text-muted-foreground">Silver Badges</div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-achievement-bronze">{stats.bronze}</div>
            <div className="text-sm text-muted-foreground">Bronze Badges</div>
          </CardContent>
        </Card>
      </div>

      {/* Progress to next achievement */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <span>Progress Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Utilization Rate</span>
              <span className="font-semibold">{currentUser.utilizationRate}%</span>
            </div>
            <Progress value={currentUser.utilizationRate} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Achievement Collection</span>
              <span className="font-semibold">{Math.round((stats.total / allAchievements.length) * 100)}%</span>
            </div>
            <Progress value={(stats.total / allAchievements.length) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Earned Achievements */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-primary flex items-center space-x-2">
          <Trophy className="h-6 w-6" />
          <span>Earned Badges ({earnedAchievements.length})</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {earnedAchievements.map(([key, achievement]) => (
            <AchievementBadge
              key={key}
              achievementKey={key}
              achievement={achievement}
              isEarned={true}
            />
          ))}
        </div>
      </div>

      {/* Available Achievements */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-muted-foreground flex items-center space-x-2">
          <Medal className="h-6 w-6" />
          <span>Available Badges ({availableAchievements.length})</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableAchievements.map(([key, achievement]) => (
            <AchievementBadge
              key={key}
              achievementKey={key}
              achievement={achievement}
              isEarned={false}
            />
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center space-x-4 pt-6">
        <Button variant="outline">
          View Achievement Guide
        </Button>
        <Button>
          Track Progress
        </Button>
      </div>
    </div>
  );
};

export default MyBadges;