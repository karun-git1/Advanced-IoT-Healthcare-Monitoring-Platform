import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Heart, 
  Thermometer, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Wifi,
  Battery,
  Monitor,
  Brain,
  Stethoscope,
  Smartphone,
  Server,
  Settings
} from 'lucide-react';
import { PatientMonitor } from './PatientMonitor';
import { DeviceManager } from './DeviceManager';
import { AlertCenter } from './AlertCenter';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { EdgeComputingPanel } from './EdgeComputingPanel';
import BackendStatus from './BackendStatus';

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

interface HealthAlert {
  id: string;
  patientId: string;
  patientName: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

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

export function HealthcareDashboard() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [alerts, setAlerts] = useState<HealthAlert[]>([]);
  const [devices, setDevices] = useState<IoTDevice[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [systemStatus, setSystemStatus] = useState({
    totalPatients: 0,
    activeDevices: 0,
    criticalAlerts: 0,
    systemUptime: '99.9%'
  });

  // Simulate real-time data updates
  useEffect(() => {
    const generateMockData = () => {
      // Generate mock patients
      const mockPatients: Patient[] = [
        {
          id: 'P001',
          name: 'John Miller',
          age: 65,
          condition: 'Hypertension',
          status: 'stable',
          lastUpdate: new Date(),
          vitals: {
            heartRate: 72 + Math.random() * 10,
            bloodPressure: { systolic: 130 + Math.random() * 10, diastolic: 85 + Math.random() * 5 },
            temperature: 98.6 + Math.random() * 2,
            oxygenSaturation: 97 + Math.random() * 3,
            timestamp: new Date()
          }
        },
        {
          id: 'P002',
          name: 'Sarah Johnson',
          age: 42,
          condition: 'Diabetes Type 2',
          status: 'warning',
          lastUpdate: new Date(),
          vitals: {
            heartRate: 85 + Math.random() * 15,
            bloodPressure: { systolic: 140 + Math.random() * 20, diastolic: 90 + Math.random() * 10 },
            temperature: 99.1 + Math.random() * 1,
            oxygenSaturation: 95 + Math.random() * 3,
            timestamp: new Date()
          }
        },
        {
          id: 'P003',
          name: 'Robert Chen',
          age: 58,
          condition: 'Cardiac Arrhythmia',
          status: 'critical',
          lastUpdate: new Date(),
          vitals: {
            heartRate: 120 + Math.random() * 20,
            bloodPressure: { systolic: 160 + Math.random() * 15, diastolic: 95 + Math.random() * 10 },
            temperature: 100.2 + Math.random() * 1,
            oxygenSaturation: 92 + Math.random() * 3,
            timestamp: new Date()
          }
        },
        {
          id: 'P004',
          name: 'Emily Davis',
          age: 34,
          condition: 'Post-Surgery Recovery',
          status: 'stable',
          lastUpdate: new Date(),
          vitals: {
            heartRate: 68 + Math.random() * 8,
            bloodPressure: { systolic: 115 + Math.random() * 10, diastolic: 75 + Math.random() * 5 },
            temperature: 98.8 + Math.random() * 1,
            oxygenSaturation: 99 + Math.random() * 1,
            timestamp: new Date()
          }
        }
      ];

      // Generate mock devices
      const mockDevices: IoTDevice[] = [
        {
          id: 'ECG001',
          name: 'Cardiac Monitor Alpha',
          type: 'ECG',
          status: 'online',
          patientId: 'P003',
          batteryLevel: 85,
          signalStrength: 95,
          lastSync: new Date()
        },
        {
          id: 'BP002',
          name: 'Blood Pressure Monitor Beta',
          type: 'Blood Pressure',
          status: 'online',
          patientId: 'P001',
          batteryLevel: 92,
          signalStrength: 88,
          lastSync: new Date()
        },
        {
          id: 'OX003',
          name: 'Pulse Oximeter Gamma',
          type: 'Pulse Oximeter',
          status: 'offline',
          patientId: 'P002',
          batteryLevel: 15,
          signalStrength: 0,
          lastSync: new Date(Date.now() - 300000)
        },
        {
          id: 'TEMP004',
          name: 'Smart Thermometer Delta',
          type: 'Thermometer',
          status: 'online',
          patientId: 'P004',
          batteryLevel: 78,
          signalStrength: 92,
          lastSync: new Date()
        }
      ];

      // Generate mock alerts
      const mockAlerts: HealthAlert[] = [
        {
          id: 'A001',
          patientId: 'P003',
          patientName: 'Robert Chen',
          type: 'critical',
          message: 'Irregular heart rhythm detected - immediate attention required',
          timestamp: new Date(),
          acknowledged: false
        },
        {
          id: 'A002',
          patientId: 'P002',
          patientName: 'Sarah Johnson',
          type: 'warning',
          message: 'Blood pressure elevated above normal range',
          timestamp: new Date(Date.now() - 120000),
          acknowledged: false
        },
        {
          id: 'A003',
          patientId: 'P002',
          patientName: 'Sarah Johnson',
          type: 'warning',
          message: 'Pulse oximeter device offline for 5 minutes',
          timestamp: new Date(Date.now() - 300000),
          acknowledged: true
        }
      ];

      setPatients(mockPatients);
      setDevices(mockDevices);
      setAlerts(mockAlerts);
      
      setSystemStatus({
        totalPatients: mockPatients.length,
        activeDevices: mockDevices.filter(d => d.status === 'online').length,
        criticalAlerts: mockAlerts.filter(a => a.type === 'critical' && !a.acknowledged).length,
        systemUptime: '99.9%'
      });

      if (!selectedPatient) {
        setSelectedPatient(mockPatients[0]);
      }
    };

    generateMockData();
    
    // Update data every 5 seconds to simulate real-time monitoring
    const interval = setInterval(generateMockData, 5000);
    
    return () => clearInterval(interval);
  }, [selectedPatient]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'bg-success';
      case 'warning': return 'bg-warning';
      case 'critical': return 'bg-critical';
      default: return 'bg-muted';
    }
  };

  const getDeviceStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-success';
      case 'offline': return 'text-critical';
      case 'maintenance': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <BackendStatus />
      {/* Header */}
      <header className="border-b bg-card shadow-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 gradient-healthcare rounded-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">HealthCare IoT Platform</h1>
                <p className="text-sm text-muted-foreground">Enterprise Remote Patient Monitoring</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="h-2 w-2 bg-success rounded-full pulse-medical"></div>
              <span className="text-muted-foreground">System Status: Online</span>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-80 border-r bg-card shadow-card">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">System Overview</h2>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{systemStatus.totalPatients}</p>
                      <p className="text-xs text-muted-foreground">Patients</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Monitor className="h-5 w-5 text-healthcare-green" />
                    <div>
                      <p className="text-2xl font-bold">{systemStatus.activeDevices}</p>
                      <p className="text-xs text-muted-foreground">Active Devices</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-critical" />
                    <div>
                      <p className="text-2xl font-bold">{systemStatus.criticalAlerts}</p>
                      <p className="text-xs text-muted-foreground">Critical Alerts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Server className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{systemStatus.systemUptime}</p>
                      <p className="text-xs text-muted-foreground">Uptime</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Patient List */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Active Patients</h3>
              {patients.map((patient) => (
                <Card 
                  key={patient.id} 
                  className={`cursor-pointer medical-transition hover-medical ${
                    selectedPatient?.id === patient.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="h-10 w-10 rounded-full bg-gradient-subtle flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {patient.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full ${getStatusColor(patient.status)} flex items-center justify-center`}>
                            {patient.status === 'stable' && <CheckCircle className="h-2 w-2 text-white" />}
                            {patient.status === 'warning' && <Clock className="h-2 w-2 text-white" />}
                            {patient.status === 'critical' && <AlertTriangle className="h-2 w-2 text-white vital-sign-pulse" />}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{patient.name}</p>
                          <p className="text-xs text-muted-foreground">{patient.condition}</p>
                        </div>
                      </div>
                      <Badge variant={patient.status === 'stable' ? 'secondary' : patient.status === 'warning' ? 'outline' : 'destructive'}>
                        {patient.status}
                      </Badge>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-3 w-3 text-critical heartbeat" />
                        <span>{Math.round(patient.vitals.heartRate)} BPM</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Activity className="h-3 w-3 text-primary" />
                        <span>{Math.round(patient.vitals.bloodPressure.systolic)}/{Math.round(patient.vitals.bloodPressure.diastolic)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview" className="flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="monitoring" className="flex items-center space-x-2">
                <Stethoscope className="h-4 w-4" />
                <span>Patient Monitor</span>
              </TabsTrigger>
              <TabsTrigger value="devices" className="flex items-center space-x-2">
                <Smartphone className="h-4 w-4" />
                <span>Device Manager</span>
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Alert Center</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <Brain className="h-4 w-4" />
                <span>AI Analytics</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PatientMonitor patient={selectedPatient} />
                <EdgeComputingPanel devices={devices} />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AlertCenter alerts={alerts.slice(0, 5)} onAcknowledge={(id) => {
                  setAlerts(alerts.map(a => a.id === id ? { ...a, acknowledged: true } : a));
                }} />
                <DeviceManager devices={devices.slice(0, 4)} />
              </div>
            </TabsContent>

            <TabsContent value="monitoring">
              <PatientMonitor patient={selectedPatient} />
            </TabsContent>

            <TabsContent value="devices">
              <DeviceManager devices={devices} />
            </TabsContent>

            <TabsContent value="alerts">
              <AlertCenter alerts={alerts} onAcknowledge={(id) => {
                setAlerts(alerts.map(a => a.id === id ? { ...a, acknowledged: true } : a));
              }} />
            </TabsContent>

            <TabsContent value="analytics">
              <AnalyticsDashboard patients={patients} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}