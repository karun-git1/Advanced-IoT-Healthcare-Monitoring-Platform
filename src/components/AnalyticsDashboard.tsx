import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Activity,
  Users,
  AlertTriangle,
  CheckCircle,
  Zap,
  Target,
  Database,
  RefreshCw
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

interface AnalyticsDashboardProps {
  patients: Patient[];
}

export function AnalyticsDashboard({ patients }: AnalyticsDashboardProps) {
  // Calculate analytics
  const stablePatients = patients.filter(p => p.status === 'stable').length;
  const warningPatients = patients.filter(p => p.status === 'warning').length;
  const criticalPatients = patients.filter(p => p.status === 'critical').length;
  
  const avgHeartRate = patients.reduce((acc, p) => acc + p.vitals.heartRate, 0) / patients.length;
  const avgSystolic = patients.reduce((acc, p) => acc + p.vitals.bloodPressure.systolic, 0) / patients.length;
  const avgTemperature = patients.reduce((acc, p) => acc + p.vitals.temperature, 0) / patients.length;
  const avgOxygenSat = patients.reduce((acc, p) => acc + p.vitals.oxygenSaturation, 0) / patients.length;

  // AI/ML Insights
  const aiInsights = [
    {
      type: 'prediction',
      risk: 'high',
      title: 'Cardiac Event Risk Prediction',
      description: 'Patient Robert Chen shows 85% probability of cardiac event within 24 hours',
      confidence: 0.85,
      action: 'Recommend immediate cardiology consultation'
    },
    {
      type: 'trend',
      risk: 'medium',
      title: 'Blood Pressure Trend Analysis',
      description: 'Sarah Johnson\'s BP trending upward over past 3 days',
      confidence: 0.72,
      action: 'Consider medication adjustment'
    },
    {
      type: 'anomaly',
      risk: 'low',
      title: 'Sleep Pattern Anomaly',
      description: 'John Miller showing irregular sleep patterns affecting recovery',
      confidence: 0.68,
      action: 'Sleep study recommended'
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-critical';
      case 'medium': return 'text-warning';
      case 'low': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskBg = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-critical/10 border-critical/20';
      case 'medium': return 'bg-warning/10 border-warning/20';
      case 'low': return 'bg-primary/10 border-primary/20';
      default: return 'bg-muted/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Analytics Header */}
      <Card className="shadow-medical">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-primary" />
              <span>AI-Powered Analytics & Predictions</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Badge variant="outline" className="flex items-center space-x-1">
                <div className="h-2 w-2 bg-success rounded-full pulse-medical"></div>
                <span>ML Models Active</span>
              </Badge>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* AI Model Status */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <div className="text-2xl font-bold text-success">4</div>
              <div className="text-sm text-muted-foreground">Active Models</div>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-primary">99.2%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="text-center p-4 bg-healthcare-green/10 rounded-lg">
              <div className="text-2xl font-bold text-healthcare-green">15ms</div>
              <div className="text-sm text-muted-foreground">Inference Time</div>
            </div>
            <div className="text-center p-4 bg-warning/10 rounded-lg">
              <div className="text-2xl font-bold text-warning">3</div>
              <div className="text-sm text-muted-foreground">Alerts Generated</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="shadow-medical">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <span>AI-Generated Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <Card key={index} className={`border ${getRiskBg(insight.risk)} shadow-card`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        {insight.type === 'prediction' && <Brain className={`h-5 w-5 ${getRiskColor(insight.risk)}`} />}
                        {insight.type === 'trend' && <TrendingUp className={`h-5 w-5 ${getRiskColor(insight.risk)}`} />}
                        {insight.type === 'anomaly' && <AlertTriangle className={`h-5 w-5 ${getRiskColor(insight.risk)}`} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{insight.title}</h4>
                          <Badge variant={insight.risk === 'high' ? 'destructive' : 'secondary'}>
                            {insight.risk} risk
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                        <p className="text-sm font-medium text-primary">{insight.action}</p>
                        <div className="mt-2">
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <span>Confidence: {Math.round(insight.confidence * 100)}%</span>
                            <div className="w-16 h-1 bg-muted rounded overflow-hidden">
                              <div 
                                className={`h-full ${insight.confidence > 0.8 ? 'bg-success' : insight.confidence > 0.6 ? 'bg-warning' : 'bg-critical'} rounded`}
                                style={{ width: `${insight.confidence * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {insight.risk === 'high' && (
                        <Button variant="critical" size="sm">
                          Act Now
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Population Health Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Status Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-primary" />
              <span>Patient Status Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-success rounded"></div>
                  <span className="text-sm">Stable</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{stablePatients}</span>
                  <span className="text-sm text-muted-foreground">({Math.round(stablePatients/patients.length*100)}%)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-warning rounded"></div>
                  <span className="text-sm">Warning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{warningPatients}</span>
                  <span className="text-sm text-muted-foreground">({Math.round(warningPatients/patients.length*100)}%)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-critical rounded"></div>
                  <span className="text-sm">Critical</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{criticalPatients}</span>
                  <span className="text-sm text-muted-foreground">({Math.round(criticalPatients/patients.length*100)}%)</span>
                </div>
              </div>
            </div>
            
            {/* Pie chart visualization (simplified) */}
            <div className="mt-6 h-32 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">{patients.length}</div>
                <div className="text-sm text-muted-foreground">Total Patients</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vital Signs Averages */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>Population Vital Signs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-critical/5 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-critical/10 rounded">
                    <Activity className="h-4 w-4 text-critical" />
                  </div>
                  <span className="text-sm font-medium">Heart Rate</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">{Math.round(avgHeartRate)} BPM</div>
                  <div className="text-xs text-muted-foreground">Population avg</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-primary/10 rounded">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Blood Pressure</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">{Math.round(avgSystolic)} mmHg</div>
                  <div className="text-xs text-muted-foreground">Systolic avg</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-warning/5 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-warning/10 rounded">
                    <Activity className="h-4 w-4 text-warning" />
                  </div>
                  <span className="text-sm font-medium">Temperature</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">{avgTemperature.toFixed(1)}°F</div>
                  <div className="text-xs text-muted-foreground">Population avg</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-healthcare-green/5 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-healthcare-green/10 rounded">
                    <Activity className="h-4 w-4 text-healthcare-green" />
                  </div>
                  <span className="text-sm font-medium">SpO2</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">{Math.round(avgOxygenSat)}%</div>
                  <div className="text-xs text-muted-foreground">Population avg</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ML Model Performance */}
      <Card className="shadow-medical">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-primary" />
            <span>Machine Learning Model Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Arrhythmia Detection</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Accuracy</span>
                  <span className="font-medium">99.2%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded overflow-hidden">
                  <div className="h-full w-[99.2%] bg-success rounded"></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Sensitivity</span>
                  <span className="font-medium">98.8%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded overflow-hidden">
                  <div className="h-full w-[98.8%] bg-success rounded"></div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Fall Detection</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Accuracy</span>
                  <span className="font-medium">96.7%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded overflow-hidden">
                  <div className="h-full w-[96.7%] bg-healthcare-green rounded"></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Specificity</span>
                  <span className="font-medium">94.3%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded overflow-hidden">
                  <div className="h-full w-[94.3%] bg-healthcare-green rounded"></div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Risk Prediction</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Accuracy</span>
                  <span className="font-medium">87.4%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded overflow-hidden">
                  <div className="h-full w-[87.4%] bg-warning rounded"></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Precision</span>
                  <span className="font-medium">89.1%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded overflow-hidden">
                  <div className="h-full w-[89.1%] bg-warning rounded"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              Models last updated: 2 hours ago • Next training: 6 hours
            </div>
            <Button variant="medical" size="sm">
              View Detailed Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}