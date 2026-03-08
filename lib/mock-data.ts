// Mock data generator for demo purposes when database is unavailable

export const generateDemoMetrics = () => {
  const now = new Date();
  const hour = now.getHours();
  
  // Simulate different metrics based on time of day
  const basePatients = 1200 + Math.floor(Math.random() * 100);
  const baseConsultations = Math.floor((hour * 2) + Math.random() * 10);
  const baseWaiting = Math.max(5, Math.floor((hour - 8) * 3 + Math.random() * 5));
  
  return {
    totalPatients: basePatients,
    waitingPatients: Math.min(baseWaiting, 50),
    avgWaitTime: Math.max(10, Math.floor(Math.random() * 25 + 10)),
    bedOccupancy: Math.min(95, Math.max(60, Math.floor(Math.random() * 30 + 60))),
    aiRecommendations: Math.floor(baseConsultations * 1.5),
    acceptanceRate: Math.min(98, Math.max(85, Math.floor(Math.random() * 10 + 88))),
    criticalAlerts: Math.floor(Math.random() * 5),
    consultationsToday: Math.max(0, baseConsultations),
  };
};

export const generateDemoAlerts = () => {
  const alerts = [
    {
      id: "1",
      type: "warning",
      message: "Database connection temporarily unavailable - showing demo data",
      timestamp: new Date().toISOString(),
      severity: "medium"
    },
    {
      id: "2", 
      type: "info",
      message: "System operating normally with demo metrics",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      severity: "low"
    }
  ];

  // Add some critical alerts randomly
  if (Math.random() > 0.7) {
    alerts.push({
      id: "3",
      type: "critical",
      message: "High patient volume in emergency ward",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      severity: "high"
    });
  }

  return alerts;
};

export const generateDemoAIEvents = () => {
  const events = [
    {
      id: "1",
      type: "system",
      event: "Dashboard initialized with demo data",
      timestamp: new Date().toISOString(),
      confidence: 0.95
    },
    {
      id: "2",
      type: "clinical",
      event: "AI recommendations engine active",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      confidence: 0.87
    }
  ];

  // Add some recent AI events
  if (Math.random() > 0.5) {
    events.push({
      id: "3",
      type: "diagnosis",
      event: "Differential diagnosis completed for patient #1234",
      timestamp: new Date(Date.now() - 900000).toISOString(),
      confidence: 0.92
    });
  }

  if (Math.random() > 0.6) {
    events.push({
      id: "4",
      type: "treatment",
      event: "Treatment plan generated for acute respiratory infection",
      timestamp: new Date(Date.now() - 600000).toISOString(),
      confidence: 0.89
    });
  }

  return events;
};
