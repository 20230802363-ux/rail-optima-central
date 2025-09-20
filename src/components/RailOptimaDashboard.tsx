import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import NetworkMap from './NetworkMap';
import { 
  Train, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Activity,
  Route,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Zap
} from 'lucide-react';

// Mock data for demonstration
const mockTrains = [
  { id: 'T001', name: '12301 Howrah Rajdhani', status: 'on-time', delay: 0, location: 'New Delhi', progress: 75 },
  { id: 'T002', name: '12002 Bhopal Shatabdi', status: 'delayed', delay: 15, location: 'Gwalior Jn', progress: 45 },
  { id: 'T003', name: '12622 Tamil Nadu Exp', status: 'on-time', delay: 0, location: 'Chennai Central', progress: 90 },
  { id: 'T004', name: '12423 Dibrugarh Exp', status: 'critical', delay: 45, location: 'Guwahati', progress: 20 },
];

const mockAlerts = [
  { id: 'A001', type: 'critical', message: 'Track maintenance at KM 245-250, reducing speed to 30 kmph', time: '14:32' },
  { id: 'A002', type: 'warning', message: 'Platform 3 occupancy conflict between T002 and T007', time: '14:28' },
  { id: 'A003', type: 'info', message: 'Weather alert: Heavy fog expected after 18:00', time: '14:15' },
];

const mockStations = [
  { id: 'S001', name: 'New Delhi', trains: 12, capacity: 20, utilization: 60 },
  { id: 'S002', name: 'Mumbai Central', trains: 15, capacity: 18, utilization: 83 },
  { id: 'S003', name: 'Chennai Central', trains: 8, capacity: 16, utilization: 50 },
  { id: 'S004', name: 'Kolkata Howrah', trains: 14, capacity: 22, utilization: 64 },
];

export default function RailOptimaDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'success';
      case 'delayed': return 'warning';
      case 'critical': return 'danger';
      default: return 'muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-time': return <CheckCircle className="w-4 h-4" />;
      case 'delayed': return <Clock className="w-4 h-4" />;
      case 'critical': return <XCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dashboard rail-grid p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Train className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                RailOptima
              </h1>
              <p className="text-muted-foreground">Railway Operations Control Center</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">System Time</p>
            <p className="text-xl font-mono">{currentTime.toLocaleTimeString()}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant={isSimulating ? "secondary" : "default"} 
              size="sm"
              onClick={() => setIsSimulating(!isSimulating)}
              className="shadow-rail"
            >
              {isSimulating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isSimulating ? 'Pause' : 'Simulate'}
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trains">Live Trains</TabsTrigger>
          <TabsTrigger value="network">Network Map</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="shadow-rail">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Trains</CardTitle>
                <Train className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">247</div>
                <p className="text-xs text-success-foreground">
                  <span className="text-success">+12</span> from yesterday
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-rail">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">On-Time Performance</CardTitle>
                <CheckCircle className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87.3%</div>
                <p className="text-xs text-success-foreground">
                  <span className="text-success">+2.1%</span> improvement
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-alert">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-warning-foreground">
                  <span className="text-warning">3 critical</span> need attention
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-rail">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Network Efficiency</CardTitle>
                <Zap className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-success-foreground">
                  <span className="text-success">Optimal</span> performance
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Alerts and Train Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Critical Alerts */}
            <Card className="shadow-alert">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  <span>Critical Alerts</span>
                </CardTitle>
                <CardDescription>Real-time system notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockAlerts.map((alert) => (
                  <Alert key={alert.id} className={`border-l-4 border-l-${alert.type}`}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle className="flex items-center justify-between">
                      <span className="capitalize">{alert.type}</span>
                      <span className="text-sm font-normal text-muted-foreground">{alert.time}</span>
                    </AlertTitle>
                    <AlertDescription>{alert.message}</AlertDescription>
                  </Alert>
                ))}
              </CardContent>
            </Card>

            {/* Station Capacity */}
            <Card className="shadow-rail">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Station Capacity</span>
                </CardTitle>
                <CardDescription>Current platform utilization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockStations.map((station) => (
                  <div key={station.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{station.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {station.trains}/{station.capacity}
                      </span>
                    </div>
                    <Progress 
                      value={station.utilization} 
                      className={`h-2 ${station.utilization > 80 ? 'bg-warning/20' : 'bg-success/20'}`}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trains" className="space-y-6">
          <Card className="shadow-rail">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-primary rail-pulse" />
                <span>Live Train Monitoring</span>
              </CardTitle>
              <CardDescription>Real-time train positions and status updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTrains.map((train) => (
                  <div key={train.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="train-indicator w-12 h-8 bg-primary rounded flex items-center justify-center">
                      <Train className="w-4 h-4 text-primary-foreground" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{train.name}</h4>
                        <Badge variant={getStatusColor(train.status) as any} className="flex items-center space-x-1">
                          {getStatusIcon(train.status)}
                          <span className="capitalize">{train.status}</span>
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{train.location}</span>
                        </span>
                        {train.delay > 0 && (
                          <span className="flex items-center space-x-1 text-warning-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{train.delay} min delay</span>
                          </span>
                        )}
                      </div>
                      
                      <Progress value={train.progress} className="h-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          <NetworkMap />
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-rail">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span>Schedule Optimization</span>
                </CardTitle>
                <CardDescription>AI-powered route and timing optimization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Last Optimization</span>
                    <span className="text-sm text-muted-foreground">2 minutes ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Conflicts Resolved</span>
                    <span className="font-semibold text-success">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Time Saved</span>
                    <span className="font-semibold text-success">45 minutes</span>
                  </div>
                </div>
                
                <div className="pt-4 space-y-2">
                  <Button className="w-full shadow-rail">
                    <Zap className="w-4 h-4 mr-2" />
                    Run Optimization
                  </Button>
                  <Button variant="outline" className="w-full">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset to Default
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-rail">
              <CardHeader>
                <CardTitle>Scenario Simulation</CardTitle>
                <CardDescription>Test different operational scenarios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Simulation Type</label>
                    <select className="w-full mt-1 p-2 border rounded bg-input">
                      <option>Peak Hour Traffic</option>
                      <option>Weather Disruption</option>
                      <option>Track Maintenance</option>
                      <option>Emergency Response</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Duration (hours)</label>
                    <input 
                      type="number" 
                      className="w-full mt-1 p-2 border rounded bg-input" 
                      placeholder="4" 
                      min="1" 
                      max="24" 
                    />
                  </div>
                </div>
                
                <Button 
                  className="w-full shadow-rail" 
                  disabled={isSimulating}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isSimulating ? 'Simulating...' : 'Start Simulation'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}