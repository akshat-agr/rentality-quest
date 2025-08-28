import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { equipmentTypes } from '../data/mockData';

const AssetLibrary = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-primary slide-in-up">Asset Library</h1>
      </div>

      {/* Equipment Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipmentTypes.map((equipment, index) => {
          const utilizationRate = ((equipment.active / equipment.total) * 100).toFixed(1);
          
          return (
            <Card 
              key={equipment.name} 
              className="card-hover slide-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold text-primary">
                  {equipment.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Total Count */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-2">
                    {equipment.total}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Units</div>
                </div>

                {/* Status Breakdown */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-success rounded-full" />
                      <span>{equipment.active} Active</span>
                    </div>
                    <span className="font-semibold">{utilizationRate}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-warning rounded-full" />
                      <span>{equipment.idle} Idle</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-destructive rounded-full" />
                      <span>{equipment.maintenance} Maintenance</span>
                    </div>
                  </div>
                </div>

                {/* Utilization Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Utilization Rate</span>
                    <span className="font-semibold">{utilizationRate}%</span>
                  </div>
                  <Progress 
                    value={parseFloat(utilizationRate)} 
                    className={`h-2 ${
                      utilizationRate >= 90 ? 'progress-excellent' :
                      utilizationRate >= 75 ? 'progress-good' :
                      utilizationRate >= 60 ? 'progress-average' :
                      'progress-poor'
                    }`}
                  />
                </div>

                {/* Rental Stats */}
                <div className="pt-2 border-t border-border">
                  <div className="text-center text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">
                      {Math.floor(equipment.active * 0.8)}
                    </span> Rented
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 pt-6">
        <Button variant="outline" className="flex items-center space-x-2">
          <RefreshCw className="h-4 w-4" />
          <span>Refresh Data</span>
        </Button>
        
        <Button className="flex items-center space-x-2">
          <span>View All Assets</span>
        </Button>
      </div>
    </div>
  );
};

export default AssetLibrary;