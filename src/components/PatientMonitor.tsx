import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Activity, 
  Thermometer, 
  Droplets, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Monitor
} from 'lucide-react';

interface HealthMetrics {
  heartRate: number;
  bloodPressure: { systolic: number; diastolic: number };
  temperature: number;
  oxygenSaturation: number;
  timestamp: Date;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  status: 'stable' | 'warning' | 'critical';
  lastUpdate: Date;
  vitals: HealthMetrics;
}

interface PatientMonitorProps {
  patient: Patient | null;
}

export function PatientMonitor({ patient }: PatientMonitorProps) {
  if (!patient) {
    return (
      <Card className="shadow-card">
        <CardContent className="p-8">
          <div className="text-center">
            <Monitor className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">No Patient Selected</h3>
            <p className="text-sm text-muted-foreground">Select a patient to view their real-time monitoring data</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getVitalStatus = (vital: string, value: number) => {
    switch (vital) {
      case 'heartRate':
        if (value < 60 || value > 100) return 'warning';
        if (value < 50 || value > 120) return 'critical';
        return 'stable';
      case 'temperature':
        if (value > 99.5) return 'warning';
        if (value > 101) return 'critical';
        return 'stable';
      case 'oxygenSaturation':
        if (value < 95) return 'warning';
        if (value < 90) return 'critical';
        return 'stable';
      case 'bloodPressure':
        if (value > 140) return 'warning';
        if (value > 160) return 'critical';
        return 'stable';
      default:
        return 'stable';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'stable': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'critical': return <AlertTriangle className="h-4 w-4 text-critical vital-sign-pulse" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-critical';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Patient Header */}
      <Card className="shadow-medical">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="h-16 w-16 rounded-full gradient-subtle flex items-center justify-center text-lg font-bold">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full ${
                  patient.status === 'stable' ? 'bg-success' : 
                  patient.status === 'warning' ? 'bg-warning' : 'bg-critical'
                } flex items-center justify-center`}>
                  {getStatusIcon(patient.status)}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{patient.name}</h2>
                <p className="text-muted-foreground">Age: {patient.age} • Condition: {patient.condition}</p>
                <p className="text-sm text-muted-foreground">
                  Last Updated: {patient.lastUpdate.toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <Badge 
                variant={patient.status === 'stable' ? 'secondary' : 'destructive'}
                className={`${patient.status === 'critical' ? 'pulse-medical' : ''}`}
              >
                {patient.status.toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Vital Signs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Heart Rate */}
        <Card className="shadow-card hover-medical medical-transition">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-critical/10 rounded-lg">
                  <Heart className="h-6 w-6 text-critical heartbeat" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Heart Rate</p>
                  <p className="text-2xl font-bold">{Math.round(patient.vitals.heartRate)}</p>
                  <p className="text-xs text-muted-foreground">BPM</p>
                </div>
              </div>
              <div className="text-right">
                {getStatusIcon(getVitalStatus('heartRate', patient.vitals.heartRate))}
                <p className={`text-xs font-medium ${getStatusColor(getVitalStatus('heartRate', patient.vitals.heartRate))}`}>
                  {getVitalStatus('heartRate', patient.vitals.heartRate)}
                </p>
              </div>
            </div>
            
            {/* Mini trend line simulation */}
            <div className="mt-4 h-8 bg-muted rounded overflow-hidden relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-1 bg-critical/20 rounded">
                  <div className="h-full w-3/4 bg-critical rounded vital-sign-pulse"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blood Pressure */}
        <Card className="shadow-card hover-medical medical-transition">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Blood Pressure</p>
                  <p className="text-2xl font-bold">
                    {Math.round(patient.vitals.bloodPressure.systolic)}/
                    {Math.round(patient.vitals.bloodPressure.diastolic)}
                  </p>
                  <p className="text-xs text-muted-foreground">mmHg</p>
                </div>
              </div>
              <div className="text-right">
                {getStatusIcon(getVitalStatus('bloodPressure', patient.vitals.bloodPressure.systolic))}
                <p className={`text-xs font-medium ${getStatusColor(getVitalStatus('bloodPressure', patient.vitals.bloodPressure.systolic))}`}>
                  {getVitalStatus('bloodPressure', patient.vitals.bloodPressure.systolic)}
                </p>
              </div>
            </div>
            
            <div className="mt-4 h-8 bg-muted rounded overflow-hidden relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-1 bg-primary/20 rounded">
                  <div className="h-full w-2/3 bg-primary rounded"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Temperature */}
        <Card className="shadow-card hover-medical medical-transition">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-warning/10 rounded-lg">
                  <Thermometer className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Temperature</p>
                  <p className="text-2xl font-bold">{patient.vitals.temperature.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">°F</p>
                </div>
              </div>
              <div className="text-right">
                {getStatusIcon(getVitalStatus('temperature', patient.vitals.temperature))}
                <p className={`text-xs font-medium ${getStatusColor(getVitalStatus('temperature', patient.vitals.temperature))}`}>
                  {getVitalStatus('temperature', patient.vitals.temperature)}
                </p>
              </div>
            </div>
            
            <div className="mt-4 h-8 bg-muted rounded overflow-hidden relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-1 bg-warning/20 rounded">
                  <div className="h-full w-1/2 bg-warning rounded"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Oxygen Saturation */}
        <Card className="shadow-card hover-medical medical-transition">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-healthcare-green/10 rounded-lg">
                  <Droplets className="h-6 w-6 text-healthcare-green" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">SpO2</p>
                  <p className="text-2xl font-bold">{Math.round(patient.vitals.oxygenSaturation)}</p>
                  <p className="text-xs text-muted-foreground">%</p>
                </div>
              </div>
              <div className="text-right">
                {getStatusIcon(getVitalStatus('oxygenSaturation', patient.vitals.oxygenSaturation))}
                <p className={`text-xs font-medium ${getStatusColor(getVitalStatus('oxygenSaturation', patient.vitals.oxygenSaturation))}`}>
                  {getVitalStatus('oxygenSaturation', patient.vitals.oxygenSaturation)}
                </p>
              </div>
            </div>
            
            <div className="mt-4 h-8 bg-muted rounded overflow-hidden relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-1 bg-healthcare-green/20 rounded">
                  <div className="h-full w-5/6 bg-healthcare-green rounded"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Waveforms Simulation */}
      <Card className="shadow-medical">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-primary" />
            <span>Real-time Waveforms</span>
            <Badge variant="outline" className="ml-auto">
              <div className="h-2 w-2 bg-success rounded-full mr-1 pulse-medical"></div>
              Live
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* ECG Simulation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">ECG (Lead II)</h4>
              <span className="text-xs text-muted-foreground">{Math.round(patient.vitals.heartRate)} BPM</span>
            </div>
            <div className="h-20 bg-card border rounded-lg p-4 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-critical/20 to-transparent">
                <svg className="w-full h-full" viewBox="0 0 400 80">
                  <path
                    d="M0,40 L50,40 L60,20 L70,60 L80,40 L400,40"
                    stroke="hsl(var(--critical))"
                    strokeWidth="2"
                    fill="none"
                    className="heartbeat"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <Button variant="medical" size="sm">
              View Historical Data
            </Button>
            <Button variant="outline" size="sm">
              Export Report
            </Button>
            <Button variant="healthcare" size="sm">
              Contact Provider
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}