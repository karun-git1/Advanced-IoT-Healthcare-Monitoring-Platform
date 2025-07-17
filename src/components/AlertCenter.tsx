import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Bell, 
  Clock, 
  CheckCircle, 
  X,
  Filter,
  Search,
  Phone,
  Mail,
  MessageSquare
} from 'lucide-react';

interface HealthAlert {
  id: string;
  patientId: string;
  patientName: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

interface AlertCenterProps {
  alerts: HealthAlert[];
  onAcknowledge: (alertId: string) => void;
}

export function AlertCenter({ alerts, onAcknowledge }: AlertCenterProps) {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-5 w-5 text-critical" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'info': return <Bell className="h-5 w-5 text-primary" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-l-critical bg-critical/5';
      case 'warning': return 'border-l-warning bg-warning/5';
      case 'info': return 'border-l-primary bg-primary/5';
      default: return 'border-l-muted';
    }
  };

  const formatTimestamp = (date: Date) => {
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

  const criticalAlerts = alerts.filter(a => a.type === 'critical' && !a.acknowledged).length;
  const warningAlerts = alerts.filter(a => a.type === 'warning' && !a.acknowledged).length;
  const totalUnacknowledged = alerts.filter(a => !a.acknowledged).length;

  return (
    <div className="space-y-6">
      <Card className="shadow-medical">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-primary" />
              <span>Alert Center</span>
              {totalUnacknowledged > 0 && (
                <Badge variant="destructive" className="pulse-medical">
                  {totalUnacknowledged}
                </Badge>
              )}
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-1" />
                Search
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Alert Summary */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className={`text-center p-4 bg-critical/10 rounded-lg ${criticalAlerts > 0 ? 'pulse-medical' : ''}`}>
              <div className="text-2xl font-bold text-critical">{criticalAlerts}</div>
              <div className="text-sm text-muted-foreground">Critical</div>
            </div>
            <div className="text-center p-4 bg-warning/10 rounded-lg">
              <div className="text-2xl font-bold text-warning">{warningAlerts}</div>
              <div className="text-sm text-muted-foreground">Warning</div>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-primary">{totalUnacknowledged}</div>
              <div className="text-sm text-muted-foreground">Unacknowledged</div>
            </div>
          </div>

          {/* Alert List */}
          <div className="space-y-3">
            {alerts.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">No Active Alerts</h3>
                <p className="text-sm text-muted-foreground">All patients are being monitored normally</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <Card 
                  key={alert.id} 
                  className={`border-l-4 ${getAlertColor(alert.type)} ${
                    !alert.acknowledged && alert.type === 'critical' ? 'alert-blink' : ''
                  } ${alert.acknowledged ? 'opacity-60' : ''} shadow-card hover-medical medical-transition`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          {getAlertIcon(alert.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-sm">{alert.patientName}</h4>
                            <Badge 
                              variant={alert.type === 'critical' ? 'destructive' : 'secondary'}
                              className={`text-xs ${alert.type === 'critical' && !alert.acknowledged ? 'pulse-medical' : ''}`}
                            >
                              {alert.type.toUpperCase()}
                            </Badge>
                            {alert.acknowledged && (
                              <Badge variant="outline" className="text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Acknowledged
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-foreground mb-2">{alert.message}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{formatTimestamp(alert.timestamp)}</span>
                            </span>
                            <span>Patient ID: {alert.patientId}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {!alert.acknowledged && (
                          <>
                            {alert.type === 'critical' && (
                              <div className="flex space-x-1">
                                <Button variant="critical" size="sm">
                                  <Phone className="h-4 w-4 mr-1" />
                                  Call
                                </Button>
                                <Button variant="warning" size="sm">
                                  <Mail className="h-4 w-4 mr-1" />
                                  Email
                                </Button>
                              </div>
                            )}
                            <Button 
                              variant="healthcare" 
                              size="sm"
                              onClick={() => onAcknowledge(alert.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Acknowledge
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Alert Actions for Critical Alerts */}
                    {alert.type === 'critical' && !alert.acknowledged && (
                      <div className="mt-4 p-3 bg-critical/10 rounded-lg border border-critical/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-critical" />
                            <span className="text-sm font-medium text-critical">
                              Immediate Action Required
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="critical" size="sm">
                              Emergency Protocol
                            </Button>
                            <Button variant="outline" size="sm">
                              Escalate to Doctor
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Alert Management Actions */}
          {alerts.length > 0 && (
            <div className="mt-6 flex items-center justify-between pt-4 border-t">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Mark All Read
                </Button>
                <Button variant="outline" size="sm">
                  Export Report
                </Button>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Auto-refresh: ON</span>
                <span>Sound alerts: ON</span>
                <span>Email notifications: ON</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Emergency Contact Panel */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Phone className="h-5 w-5 text-critical" />
            <span>Emergency Contacts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="critical" className="h-16 flex-col">
              <Phone className="h-5 w-5 mb-1" />
              <span>Emergency Services</span>
              <span className="text-xs">911</span>
            </Button>
            <Button variant="medical" className="h-16 flex-col">
              <MessageSquare className="h-5 w-5 mb-1" />
              <span>On-Call Doctor</span>
              <span className="text-xs">Dr. Smith</span>
            </Button>
            <Button variant="healthcare" className="h-16 flex-col">
              <Mail className="h-5 w-5 mb-1" />
              <span>Nursing Station</span>
              <span className="text-xs">Ext. 4567</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}