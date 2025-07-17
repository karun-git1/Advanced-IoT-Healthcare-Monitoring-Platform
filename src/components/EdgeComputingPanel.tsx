import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Cpu, 
  Zap, 
  Cloud, 
  Smartphone, 
  Activity, 
  Brain,
  Server,
  Wifi,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Settings
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

interface EdgeComputingPanelProps {
  devices: IoTDevice[];
}

export function EdgeComputingPanel({ devices }: EdgeComputingPanelProps) {
  // Simulate edge computing metrics
  const edgeNodes = 4;
  const totalInferences = 15847;
  const avgInferenceTime = 12;
  const edgeUptime = 99.7;
  const modelsDeployed = 6;
  const dataProcessedLocally = 87.3;

  const edgeComputingFeatures = [
    {
      name: 'Real-time Anomaly Detection',
      description: 'Detect irregular heart rhythms within 10ms',
      status: 'active',
      processingTime: '8ms',
      accuracy: '99.2%'
    },
    {
      name: 'Fall Detection',
      description: 'AI-powered fall detection using accelerometer data',
      status: 'active',
      processingTime: '15ms',
      accuracy: '96.8%'
    },
    {
      name: 'Medication Adherence',
      description: 'Smart pill bottle monitoring and reminders',
      status: 'active',
      processingTime: '5ms',
      accuracy: '94.1%'
    },
    {
      name: 'Sleep Quality Analysis',
      description: 'Continuous sleep pattern analysis and scoring',
      status: 'maintenance',
      processingTime: '20ms',
      accuracy: '91.5%'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'maintenance': return 'text-warning';
      case 'offline': return 'text-critical';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'maintenance': return <Clock className="h-4 w-4 text-warning" />;
      case 'offline': return <AlertTriangle className="h-4 w-4 text-critical" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-medical">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-primary" />
              <span>Edge AI Computing</span>
              <Badge variant="outline" className="flex items-center space-x-1">
                <div className="h-2 w-2 bg-success rounded-full pulse-medical"></div>
                <span>Active</span>
              </Badge>
            </CardTitle>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-1" />
              Configure
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Edge Computing Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Server className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">{edgeNodes}</div>
              <div className="text-sm text-muted-foreground">Edge Nodes</div>
            </div>

            <div className="text-center p-4 bg-healthcare-green/10 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-6 w-6 text-healthcare-green" />
              </div>
              <div className="text-2xl font-bold text-healthcare-green">{avgInferenceTime}ms</div>
              <div className="text-sm text-muted-foreground">Avg Inference</div>
            </div>

            <div className="text-center p-4 bg-warning/10 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Brain className="h-6 w-6 text-warning" />
              </div>
              <div className="text-2xl font-bold text-warning">{modelsDeployed}</div>
              <div className="text-sm text-muted-foreground">AI Models</div>
            </div>

            <div className="text-center p-4 bg-success/10 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div className="text-2xl font-bold text-success">{edgeUptime}%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>

          {/* Data Processing Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
              <h4 className="font-medium">Today's Processing Stats</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Inferences</span>
                  <span className="font-medium">{totalInferences.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Data Processed Locally</span>
                  <span className="font-medium">{dataProcessedLocally}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Cloud Offload</span>
                  <span className="font-medium">{(100 - dataProcessedLocally).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Bandwidth Saved</span>
                  <span className="font-medium">2.4 GB</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Performance Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Latency Reduction</span>
                  <span className="font-medium text-success">78%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Energy Efficiency</span>
                  <span className="font-medium text-success">92%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Model Accuracy</span>
                  <span className="font-medium text-success">96.4%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Error Rate</span>
                  <span className="font-medium text-success">0.03%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edge AI Features */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Cpu className="h-5 w-5 text-primary" />
            <span>Edge AI Features</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {edgeComputingFeatures.map((feature, index) => (
              <Card key={index} className="shadow-card border hover-medical medical-transition">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        feature.status === 'active' ? 'bg-success/10' :
                        feature.status === 'maintenance' ? 'bg-warning/10' : 'bg-critical/10'
                      }`}>
                        {getStatusIcon(feature.status)}
                      </div>
                      <div>
                        <h4 className="font-medium">{feature.name}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-medium">{feature.processingTime}</div>
                        <div className="text-xs text-muted-foreground">Processing</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{feature.accuracy}</div>
                        <div className="text-xs text-muted-foreground">Accuracy</div>
                      </div>
                      <Badge 
                        variant={feature.status === 'active' ? 'secondary' : 'outline'}
                        className={feature.status === 'active' ? '' : 'text-warning'}
                      >
                        {feature.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Real-time processing indicator */}
                  {feature.status === 'active' && (
                    <div className="mt-3 p-2 bg-muted rounded flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 bg-success rounded-full pulse-medical"></div>
                        <span className="text-sm">Real-time processing active</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Last inference: {Math.floor(Math.random() * 60)}s ago
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edge vs Cloud Comparison */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Cloud className="h-5 w-5 text-primary" />
            <span>Edge vs Cloud Processing</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Edge Processing */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5 text-success" />
                <h4 className="font-medium">Edge Processing</h4>
                <Badge variant="secondary">Preferred</Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Latency</span>
                  <span className="font-medium text-success">12ms</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Bandwidth Usage</span>
                  <span className="font-medium text-success">Low</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Privacy</span>
                  <span className="font-medium text-success">High</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Offline Capability</span>
                  <span className="font-medium text-success">Yes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Real-time Response</span>
                  <span className="font-medium text-success">Excellent</span>
                </div>
              </div>
            </div>

            {/* Cloud Processing */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Cloud className="h-5 w-5 text-warning" />
                <h4 className="font-medium">Cloud Processing</h4>
                <Badge variant="outline">Backup</Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Latency</span>
                  <span className="font-medium text-warning">150ms</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Bandwidth Usage</span>
                  <span className="font-medium text-warning">High</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Privacy</span>
                  <span className="font-medium text-warning">Medium</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Offline Capability</span>
                  <span className="font-medium text-critical">No</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Computational Power</span>
                  <span className="font-medium text-success">Unlimited</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="font-medium text-primary">Hybrid Processing Strategy</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Our system intelligently routes processing between edge and cloud based on complexity, 
              latency requirements, and available resources. Critical health alerts are processed 
              at the edge for immediate response, while complex analytics utilize cloud resources.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}