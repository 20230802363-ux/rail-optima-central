import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Train, Route, Navigation, Zap } from 'lucide-react';

interface Station {
  id: string;
  name: string;
  position: { x: number; y: number };
  trains: number;
  status: 'normal' | 'busy' | 'maintenance';
}

interface TrainPosition {
  id: string;
  name: string;
  position: { x: number; y: number };
  status: 'on-time' | 'delayed' | 'critical';
}

const mockStations: Station[] = [
  { id: 'S001', name: 'New Delhi', position: { x: 20, y: 30 }, trains: 12, status: 'busy' },
  { id: 'S002', name: 'Mumbai Central', position: { x: 15, y: 70 }, trains: 15, status: 'normal' },
  { id: 'S003', name: 'Chennai Central', position: { x: 60, y: 85 }, trains: 8, status: 'normal' },
  { id: 'S004', name: 'Kolkata Howrah', position: { x: 70, y: 25 }, trains: 14, status: 'maintenance' },
  { id: 'S005', name: 'Bangalore City', position: { x: 50, y: 75 }, trains: 10, status: 'normal' },
];

const mockTrains: TrainPosition[] = [
  { id: 'T001', name: '12301 Rajdhani', position: { x: 25, y: 45 }, status: 'on-time' },
  { id: 'T002', name: '12002 Shatabdi', position: { x: 35, y: 60 }, status: 'delayed' },
  { id: 'T003', name: '12622 Tamil Nadu', position: { x: 55, y: 80 }, status: 'on-time' },
  { id: 'T004', name: '12423 Dibrugarh', position: { x: 65, y: 35 }, status: 'critical' },
];

export default function NetworkMap() {
  const getStationColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-success';
      case 'busy': return 'bg-warning';
      case 'maintenance': return 'bg-danger';
      default: return 'bg-muted';
    }
  };

  const getTrainColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'bg-success';
      case 'delayed': return 'bg-warning';
      case 'critical': return 'bg-danger';
      default: return 'bg-primary';
    }
  };

  return (
    <Card className="shadow-rail">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Route className="w-5 h-5 text-primary" />
              <span>Railway Network Map</span>
            </CardTitle>
            <CardDescription>Real-time visualization of railway operations</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Navigation className="w-4 h-4 mr-2" />
              Center View
            </Button>
            <Button variant="railway" size="sm">
              <Zap className="w-4 h-4 mr-2" />
              Auto-Update
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="relative h-96 bg-muted/20 rounded-lg border overflow-hidden">
          {/* Grid Background */}
          <div className="absolute inset-0 rail-grid opacity-30"></div>
          
          {/* Railway Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            {/* Main trunk routes */}
            <line x1="20%" y1="30%" x2="70%" y2="25%" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.6" />
            <line x1="15%" y1="70%" x2="60%" y2="85%" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.6" />
            <line x1="20%" y1="30%" x2="15%" y2="70%" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.6" />
            <line x1="50%" y1="75%" x2="60%" y2="85%" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.6" />
            
            {/* Connection lines */}
            <line x1="70%" y1="25%" x2="60%" y2="85%" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.4" strokeDasharray="5,5" />
            <line x1="20%" y1="30%" x2="50%" y2="75%" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.4" strokeDasharray="5,5" />
          </svg>
          
          {/* Stations */}
          {mockStations.map((station) => (
            <div
              key={station.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ 
                left: `${station.position.x}%`, 
                top: `${station.position.y}%`,
                zIndex: 10
              }}
            >
              <div className="relative group">
                <div className={`w-4 h-4 rounded-full ${getStationColor(station.status)} border-2 border-background shadow-lg status-indicator ${station.status === 'normal' ? 'active' : ''}`}></div>
                
                {/* Station tooltip */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card border rounded-lg p-2 min-w-max shadow-lg">
                  <div className="text-sm font-semibold">{station.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {station.trains} trains • {station.status}
                  </div>
                </div>
                
                {/* Station label */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap">
                  {station.name}
                </div>
              </div>
            </div>
          ))}
          
          {/* Moving Trains */}
          {mockTrains.map((train) => (
            <div
              key={train.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ 
                left: `${train.position.x}%`, 
                top: `${train.position.y}%`,
                zIndex: 15
              }}
            >
              <div className="relative group">
                <div className={`w-6 h-4 rounded ${getTrainColor(train.status)} border border-background shadow-lg flex items-center justify-center train-indicator`}>
                  <Train className="w-3 h-3 text-white" />
                </div>
                
                {/* Train tooltip */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card border rounded-lg p-2 min-w-max shadow-lg">
                  <div className="text-sm font-semibold">{train.name}</div>
                  <div className="text-xs text-muted-foreground">
                    Status: <span className="capitalize">{train.status}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-card border rounded-lg p-3 shadow-lg" style={{ zIndex: 20 }}>
            <div className="text-xs font-semibold mb-2">Legend</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span>Normal/On-time</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <span>Busy/Delayed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-danger rounded-full"></div>
                <span>Maintenance/Critical</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Network Stats */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {mockStations.length}
            </div>
            <div className="text-sm text-muted-foreground">Active Stations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {mockTrains.filter(t => t.status === 'on-time').length}
            </div>
            <div className="text-sm text-muted-foreground">On Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">
              {mockTrains.filter(t => t.status === 'delayed').length}
            </div>
            <div className="text-sm text-muted-foreground">Delayed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-danger">
              {mockTrains.filter(t => t.status === 'critical').length}
            </div>
            <div className="text-sm text-muted-foreground">Critical</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}