import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Battery, 
  Wifi, 
  WifiOff, 
  Activity, 
  Heart, 
  Thermometer, 
  Droplets,
  Settings,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';

interface IoTDevice {
  id: string;
  name: string;
  type: 'ECG' | 'Blood Pressure' | 'Pulse Oximeter' | 'Thermometer' | 'Glucose Meter';
  status: 'online' | 'offline' | 'maintenance';
  patientId?: string;
  batteryLevel: number;
  signalStrength: number;
  lastSync: Date;
}

interface DeviceManagerProps {
  devices: IoTDevice[];
}

export function DeviceManager({ devices }: DeviceManagerProps) {
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'ECG': return <Heart className="h-5 w-5" />;
      case 'Blood Pressure': return <Activity className="h-5 w-5" />;
      case 'Pulse Oximeter': return <Droplets className="h-5 w-5" />;
      case 'Thermometer': return <Thermometer className="h-5 w-5" />;
      case 'Glucose Meter': return <Zap className="h-5 w-5" />;
      default: return <Smartphone className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-success';
      case 'offline': return 'text-critical';
      case 'maintenance': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'offline': return <AlertTriangle className="h-4 w-4 text-critical" />;
      case 'maintenance': return <Clock className="h-4 w-4 text-warning" />;
      default: return null;
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 60) return 'text-success';
    if (level > 30) return 'text-warning';
    return 'text-critical';
  };

  const getSignalColor = (strength: number) => {
    if (strength > 70) return 'text-success';
    if (strength > 40) return 'text-warning';
    return 'text-critical';
  };

  const formatLastSync = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const onlineDevices = devices.filter(d => d.status === 'online').length;
  const offlineDevices = devices.filter(d => d.status === 'offline').length;
  const maintenanceDevices = devices.filter(d => d.status === 'maintenance').length;

  return (
    <div className="space-y-6">
      <Card className="shadow-medical">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Smartphone className="h-5 w-5 text-primary" />
              <span>IoT Device Management</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh
              </Button>
              <Button variant="medical" size="sm">
                <Settings className="h-4 w-4 mr-1" />
                Configure
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Device Status Summary */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <div className="text-2xl font-bold text-success">{onlineDevices}</div>
              <div className="text-sm text-muted-foreground">Online</div>
            </div>
            <div className="text-center p-4 bg-critical/10 rounded-lg">
              <div className="text-2xl font-bold text-critical">{offlineDevices}</div>
              <div className="text-sm text-muted-foreground">Offline</div>
            </div>
            <div className="text-center p-4 bg-warning/10 rounded-lg">
              <div className="text-2xl font-bold text-warning">{maintenanceDevices}</div>
              <div className="text-sm text-muted-foreground">Maintenance</div>
            </div>
          </div>

          {/* Device List */}
          <div className="space-y-4">
            {devices.map((device) => (
              <Card key={device.id} className="shadow-card hover-medical medical-transition">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${
                        device.status === 'online' ? 'bg-success/10' :
                        device.status === 'offline' ? 'bg-critical/10' : 'bg-warning/10'
                      }`}>
                        <div className={getStatusColor(device.status)}>
                          {getDeviceIcon(device.type)}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{device.name}</h4>
                          {getStatusIcon(device.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{device.type} • ID: {device.id}</p>
                        {device.patientId && (
                          <p className="text-xs text-muted-foreground">Assigned to Patient {device.patientId}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      {/* Battery Level */}
                      <div className="flex items-center space-x-2">
                        <Battery className={`h-4 w-4 ${getBatteryColor(device.batteryLevel)}`} />
                        <span className={`text-sm font-medium ${getBatteryColor(device.batteryLevel)}`}>
                          {device.batteryLevel}%
                        </span>
                      </div>

                      {/* Signal Strength */}
                      <div className="flex items-center space-x-2">
                        {device.status === 'offline' ? (
                          <WifiOff className="h-4 w-4 text-critical" />
                        ) : (
                          <Wifi className={`h-4 w-4 ${getSignalColor(device.signalStrength)}`} />
                        )}
                        <span className={`text-sm font-medium ${getSignalColor(device.signalStrength)}`}>
                          {device.status === 'offline' ? '0%' : `${device.signalStrength}%`}
                        </span>
                      </div>

                      {/* Last Sync */}
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Last Sync</p>
                        <p className="text-sm font-medium">{formatLastSync(device.lastSync)}</p>
                      </div>

                      {/* Status Badge */}
                      <Badge 
                        variant={device.status === 'online' ? 'secondary' : 'destructive'}
                        className={`${device.status === 'offline' ? 'alert-blink' : ''}`}
                      >
                        {device.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Device Actions */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                      <Button variant="outline" size="sm">
                        Diagnostics
                      </Button>
                      {device.status === 'offline' && (
                        <Button variant="healthcare" size="sm">
                          Reconnect
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Firmware: v2.1.3</span>
                      <span>Edge AI: Enabled</span>
                      <span>Encryption: AES-256</span>
                    </div>
                  </div>

                  {/* Real-time Data Indicator */}
                  {device.status === 'online' && (
                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="h-2 w-2 bg-success rounded-full pulse-medical"></div>
                          <span className="text-sm font-medium">Real-time Data Stream</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {device.type === 'ECG' && '72 BPM'}
                          {device.type === 'Blood Pressure' && '120/80 mmHg'}
                          {device.type === 'Pulse Oximeter' && '98% SpO2'}
                          {device.type === 'Thermometer' && '98.6°F'}
                          {device.type === 'Glucose Meter' && '95 mg/dL'}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Edge Computing Status */}
          <Card className="mt-6 shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Zap className="h-5 w-5 text-primary" />
                <span>Edge Computing Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4</div>
                  <div className="text-sm text-muted-foreground">Edge Nodes Active</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-healthcare-green">12ms</div>
                  <div className="text-sm text-muted-foreground">Avg Inference Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">99.7%</div>
                  <div className="text-sm text-muted-foreground">ML Model Accuracy</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}