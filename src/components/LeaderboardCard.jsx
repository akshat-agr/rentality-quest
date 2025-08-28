import { Crown, Medal, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LeaderboardCard = ({ title, data, valueKey, formatValue, delay = '0s' }) => {
  const icons = [Crown, Medal, Award];
  const colors = ['text-achievement-gold', 'text-achievement-silver', 'text-achievement-bronze'];
  const bgColors = ['bg-achievement-gold/10', 'bg-achievement-silver/10', 'bg-achievement-bronze/10'];

  return (
    <Card className="card-hover fade-in-delay" style={{ animationDelay: delay }}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.map((client, index) => {
          const IconComponent = icons[index];
          return (
            <div key={client.id} className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${bgColors[index]}`}>
                <IconComponent className={`h-4 w-4 ${colors[index]}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate">{client.name}</span>
                  <span className={`text-sm font-bold ${colors[index]}`}>
                    {formatValue(client[valueKey])}
                  </span>
                </div>
                
                <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-1000 ease-out ${
                      index === 0 ? 'bg-achievement-gold' :
                      index === 1 ? 'bg-achievement-silver' :
                      'bg-achievement-bronze'
                    }`}
                    style={{ 
                      width: `${Math.min((client[valueKey] / data[0][valueKey]) * 100, 100)}%`,
                      transitionDelay: `${parseInt(delay.replace('s', '')) * 1000 + index * 200}ms`
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;