"use client";

import { useState, useEffect, useCallback } from "react";

export interface SimulatedPatient {
  id: string;
  name: string;
  uhid: string;
  abhaId: string;
  age: number;
  gender: "M" | "F";
  chiefComplaint: string;
  triage: "critical" | "urgent" | "standard";
  waitTime: number;
  assignedTo?: string;
  status: "waiting" | "in-consultation" | "completed";
}

export interface SimulatedAlert {
  id: string;
  type: "outbreak" | "critical" | "referral" | "inventory" | "system";
  title: string;
  description: string;
  severity: "critical" | "warning" | "info";
  timestamp: Date;
  district?: string;
  acknowledged: boolean;
}

export interface SimulatedAIEvent {
  id: string;
  type: "diagnosis" | "prescription" | "referral" | "alert" | "insight";
  message: string;
  confidence: number;
  timestamp: Date;
  awsService: string;
  latencyMs: number;
}

export interface SimulatedMetrics {
  totalPatients: number;
  waitingPatients: number;
  avgWaitTime: number;
  bedOccupancy: number;
  aiRecommendations: number;
  acceptanceRate: number;
  criticalAlerts: number;
  consultationsToday: number;
  pendingRate?: number;
  rejectionRate?: number;
  driftIndex?: number;
}

export interface UseSimulationOptions {
  enabled?: boolean;
  patientArrivalInterval?: number;
  alertInterval?: number;
  aiEventInterval?: number;
  metricUpdateInterval?: number;
}

export function useSimulation(options: UseSimulationOptions = {}) {
  const { enabled = true, metricUpdateInterval = 5000 } = options;

  const [patients, setPatients] = useState<SimulatedPatient[]>([]);
  const [alerts, setAlerts] = useState<SimulatedAlert[]>([]);
  const [aiEvents, setAIEvents] = useState<SimulatedAIEvent[]>([]);
  const [metrics, setMetrics] = useState<SimulatedMetrics>({
    totalPatients: 0,
    waitingPatients: 0,
    avgWaitTime: 0,
    bedOccupancy: 0,
    aiRecommendations: 0,
    acceptanceRate: 0,
    criticalAlerts: 0,
    consultationsToday: 0,
  });

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/dashboard", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        
        // Map patients to expected format for the queues
        const mappedPatients = (data.patients || []).map((p: any) => ({
          ...p,
          chiefComplaint: p.district ? `From ${p.district}` : "Follow-up consultation",
          triage: p.status === "critical" ? "critical" : p.status === "active" ? "urgent" : "standard",
          waitTime: p.waitTime || Math.floor(Math.random() * 20) + 5, // fallback if not in db
          status: (p.status === "active" ? "waiting" : p.status) as SimulatedPatient["status"],
        }));
        setPatients(mappedPatients);

        // Convert timestamps back to Date objects where expected by UI
        const mappedAlerts = (data.alerts || []).map((a: any) => ({
          ...a,
          timestamp: new Date(a.timestamp),
        }));
        setAlerts(mappedAlerts);

        const mappedAIEvents = (data.aiEvents || []).map((e: any) => ({
          ...e,
          timestamp: new Date(e.timestamp),
        }));
        setAIEvents(mappedAIEvents);

        if (data.metrics) {
          setMetrics(data.metrics);
        }
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    
    // Initial fetch
    fetchData();

    // Polling setup
    const interval = setInterval(fetchData, metricUpdateInterval);
    return () => clearInterval(interval);
  }, [enabled, metricUpdateInterval, fetchData]);

  // Acknowledge alert locally 
  const acknowledgeAlert = useCallback((alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, acknowledged: true } : a))
    );
    // Ideally update DB in background
    fetch(`/api/dashboard/alerts`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: alertId, acknowledged: true })
    }).catch(console.error);
  }, []);

  const dismissAlert = useCallback((alertId: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
  }, []);

  return {
    patients,
    alerts,
    aiEvents,
    metrics,
    acknowledgeAlert,
    dismissAlert,
  };
}
