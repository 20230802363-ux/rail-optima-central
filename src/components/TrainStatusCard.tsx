import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Train, MapPin, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface TrainData {
  id: string;
  name: string;
  status: 'on-time' | 'delayed' | 'critical';
  delay: number;
  location: string;
  progress: number;
  platform?: string;
  nextStation?: string;
  estimatedArrival?: string;
}

interface TrainStatusCardProps {
  train: TrainData;
  onClick?: () => void;
}

export default function TrainStatusCard({ train, onClick }: TrainStatusCardProps) {
  const getStatusIcon = () => {
    switch (train.status) {
      case 'on-time': return <CheckCircle className="w-4 h-4" />;
      case 'delayed': return <Clock className="w-4 h-4" />;
      case 'critical': return <XCircle className="w-4 h-4" />;
      default: return <Train className="w-4 h-4" />;
    }
  };

  const getStatusVariant = () => {
    switch (train.status) {
      case 'on-time': return 'success';
      case 'delayed': return 'warning';
      case 'critical': return 'danger';
      default: return 'default';
    }
  };

  return (
    <Card 
      className="shadow-rail hover:shadow-glow transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center space-x-2">
            <div className="train-indicator w-8 h-6 bg-primary rounded flex items-center justify-center">
              <Train className="w-3 h-3 text-primary-foreground" />
            </div>
            <span>{train.name}</span>
          </CardTitle>
          <Badge variant={getStatusVariant() as any} className="flex items-center space-x-1">
            {getStatusIcon()}
            <span className="capitalize">{train.status}</span>
          </Badge>
        </div>
        <CardDescription>Train ID: {train.id}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>Current: {train.location}</span>
          </div>
          
          {train.delay > 0 && (
            <div className="flex items-center space-x-2 text-warning-foreground">
              <Clock className="w-4 h-4" />
              <span>{train.delay} min delay</span>
            </div>
          )}
          
          {train.platform && (
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">Platform:</span>
              <span className="font-semibold">{train.platform}</span>
            </div>
          )}
          
          {train.nextStation && (
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">Next:</span>
              <span>{train.nextStation}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Journey Progress</span>
            <span>{train.progress}%</span>
          </div>
          <Progress 
            value={train.progress} 
            className={`h-2 ${train.status === 'critical' ? 'bg-danger/20' : train.status === 'delayed' ? 'bg-warning/20' : 'bg-success/20'}`}
          />
        </div>
        
        {train.estimatedArrival && (
          <div className="flex justify-between items-center text-sm pt-2 border-t">
            <span className="text-muted-foreground">Est. Arrival</span>
            <span className="font-mono">{train.estimatedArrival}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}