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
}

const indianFirstNames = [
  "Amit",
  "Priya",
  "Rajesh",
  "Sunita",
  "Vikram",
  "Meera",
  "Arun",
  "Kavitha",
  "Suresh",
  "Lakshmi",
  "Ravi",
  "Gita",
  "Mohan",
  "Anita",
  "Krishna",
  "Radha",
  "Venkat",
  "Shalini",
  "Ganesh",
  "Pooja",
  "Ramesh",
  "Deepa",
  "Prakash",
  "Nandini",
];

const indianLastNames = [
  "Sharma",
  "Patel",
  "Singh",
  "Kumar",
  "Reddy",
  "Nair",
  "Iyer",
  "Mukherjee",
  "Gupta",
  "Verma",
  "Joshi",
  "Rao",
  "Das",
  "Pillai",
  "Menon",
  "Choudhary",
];

const chiefComplaints = [
  "Fever and body aches for 3 days",
  "Persistent cough with expectoration",
  "Abdominal pain and loose stools",
  "Chest discomfort and breathlessness",
  "Headache and dizziness",
  "Joint pain and swelling",
  "Skin rash with itching",
  "Difficulty breathing",
  "High blood pressure follow-up",
  "Diabetes management review",
  "Pregnancy check-up (ANC)",
  "Pediatric vaccination",
  "Post-operative follow-up",
  "Wound dressing change",
];

const districts = [
  "Mumbai",
  "Pune",
  "Nagpur",
  "Thane",
  "Nashik",
  "Aurangabad",
  "Delhi",
  "Gurugram",
  "Noida",
  "Bengaluru",
  "Chennai",
  "Hyderabad",
];

const stateAbbreviations = ["MH", "DL", "KA", "TN", "AP", "RJ", "UP", "GJ"];

function generateUHID(): string {
  const state =
    stateAbbreviations[Math.floor(Math.random() * stateAbbreviations.length)];
  const year = "2024";
  const number = String(Math.floor(Math.random() * 999999)).padStart(6, "0");
  return `UHID-${state}-${year}-${number}`;
}

function generateABHAId(): string {
  const segments = Array(4)
    .fill(0)
    .map(() => String(Math.floor(Math.random() * 10000)).padStart(4, "0"));
  return segments.join("-");
}

function generatePatient(): SimulatedPatient {
  const firstName =
    indianFirstNames[Math.floor(Math.random() * indianFirstNames.length)];
  const lastName =
    indianLastNames[Math.floor(Math.random() * indianLastNames.length)];
  const triageRandom = Math.random();
  const triage: SimulatedPatient["triage"] =
    triageRandom < 0.1
      ? "critical"
      : triageRandom < 0.35
      ? "urgent"
      : "standard";

  return {
    id: `P-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name: `${firstName} ${lastName}`,
    uhid: generateUHID(),
    abhaId: generateABHAId(),
    age: Math.floor(Math.random() * 70) + 5,
    gender: Math.random() > 0.5 ? "M" : "F",
    chiefComplaint:
      chiefComplaints[Math.floor(Math.random() * chiefComplaints.length)],
    triage,
    waitTime: Math.floor(Math.random() * 45) + 5,
    status: "waiting",
  };
}

function generateAlert(): SimulatedAlert {
  const alertTypes: Array<{
    type: SimulatedAlert["type"];
    severity: SimulatedAlert["severity"];
    templates: string[];
  }> = [
    {
      type: "outbreak",
      severity: "critical",
      templates: [
        "Dengue cluster detected in {district} - 12 cases in 48h",
        "Unusual respiratory illness pattern in {district}",
        "Gastroenteritis outbreak suspected - {district} region",
      ],
    },
    {
      type: "critical",
      severity: "critical",
      templates: [
        "Critical patient requiring immediate attention - Ward 3",
        "Emergency: Pediatric respiratory distress - PICU",
        "Sepsis alert: Patient UHID-MH-2024-004521",
      ],
    },
    {
      type: "referral",
      severity: "warning",
      templates: [
        "Incoming referral from PHC {district} - suspected TB",
        "High-risk pregnancy transfer en route - ETA 15 min",
        "Snakebite case referred from sub-center",
      ],
    },
    {
      type: "inventory",
      severity: "warning",
      templates: [
        "Paracetamol stock below threshold - reorder needed",
        "ORS sachets running low - 3 days stock remaining",
        "Insulin supply critical - urgent procurement required",
      ],
    },
    {
      type: "system",
      severity: "info",
      templates: [
        "Model inference latency improved by 15%",
        "New MOHFW guideline update available",
        "Scheduled maintenance: 2:00 AM - 3:00 AM IST",
      ],
    },
  ];

  const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
  const template =
    alertType.templates[Math.floor(Math.random() * alertType.templates.length)];
  const district = districts[Math.floor(Math.random() * districts.length)];

  return {
    id: `A-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: alertType.type,
    title: template.replace("{district}", district),
    description: `Auto-detected by SwasthyaOS surveillance system`,
    severity: alertType.severity,
    timestamp: new Date(),
    district: alertType.type === "outbreak" ? district : undefined,
    acknowledged: false,
  };
}

function generateAIEvent(): SimulatedAIEvent {
  const events: Array<
    Omit<SimulatedAIEvent, "id" | "timestamp" | "latencyMs">
  > = [
    {
      type: "diagnosis",
      message: "Suspected Dengue Fever - recommend NS1 antigen test",
      confidence: 87,
      awsService: "Bedrock",
    },
    {
      type: "prescription",
      message: "Generated Rx: Azithromycin 500mg OD x 3 days",
      confidence: 92,
      awsService: "Bedrock",
    },
    {
      type: "referral",
      message: "High-risk pregnancy identified - recommend tertiary care",
      confidence: 94,
      awsService: "Bedrock",
    },
    {
      type: "alert",
      message: "Drug interaction detected: Metformin + contrast dye",
      confidence: 98,
      awsService: "Comprehend",
    },
    {
      type: "insight",
      message: "Pattern: 23% increase in ILI cases this week",
      confidence: 85,
      awsService: "SageMaker",
    },
    {
      type: "diagnosis",
      message: "Transcribed consultation: Chief complaint documented",
      confidence: 96,
      awsService: "Transcribe",
    },
  ];

  const event = events[Math.floor(Math.random() * events.length)];

  return {
    ...event,
    id: `AI-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date(),
    latencyMs: Math.floor(Math.random() * 800) + 200,
  };
}

export interface UseSimulationOptions {
  enabled?: boolean;
  patientArrivalInterval?: number; // ms
  alertInterval?: number; // ms
  aiEventInterval?: number; // ms
  metricUpdateInterval?: number; // ms
}

export function useSimulation(options: UseSimulationOptions = {}) {
  const {
    enabled = true,
    patientArrivalInterval = 8000,
    alertInterval = 15000,
    aiEventInterval = 5000,
    metricUpdateInterval = 3000,
  } = options;

  const [patients, setPatients] = useState<SimulatedPatient[]>([]);

  // Fetch real patients from DynamoDB API on mount
  useEffect(() => {
    if (!enabled) return;
    
    async function fetchRealPatients() {
      try {
        const res = await fetch("/api/patients");
        if (res.ok) {
          const dbPatients = await res.json();
          const mapped = dbPatients.map((p: any) => ({
            id: p.id,
            name: p.name,
            uhid: p.uhid,
            abhaId: p.abhaId || "N/A",
            age: p.age,
            gender: p.gender,
            chiefComplaint: p.district ? `From ${p.district}` : "Follow-up consultation",
            triage: p.status === "critical" ? "critical" : p.status === "active" ? "urgent" : "standard",
            waitTime: Math.floor(Math.random() * 20) + 5, // Keep some wait time for UI visualization
            status: "waiting",
          }));
          setPatients(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch real patients for dashboard:", error);
      }
    }
    
    fetchRealPatients();
  }, [enabled]);
  const [alerts, setAlerts] = useState<SimulatedAlert[]>([]);
  const [aiEvents, setAIEvents] = useState<SimulatedAIEvent[]>(() =>
    Array(5)
      .fill(0)
      .map(() => generateAIEvent())
  );
  const [metrics, setMetrics] = useState<SimulatedMetrics>({
    totalPatients: 847,
    waitingPatients: 5,
    avgWaitTime: 23,
    bedOccupancy: 78,
    aiRecommendations: 156,
    acceptanceRate: 87.6,
    criticalAlerts: 2,
    consultationsToday: 89,
  });

  // Patient queue simulation
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      setPatients((prev) => {
        // Random chance to move a patient to consultation
        if (Math.random() > 0.5 && prev.some((p) => p.status === "waiting")) {
          const waitingIdx = prev.findIndex((p) => p.status === "waiting");
          if (waitingIdx !== -1) {
            const updated = [...prev];
            updated[waitingIdx] = {
              ...updated[waitingIdx],
              status: "in-consultation",
            };
            return updated;
          }
        }

        // Random chance to complete a consultation
        if (
          Math.random() > 0.7 &&
          prev.some((p) => p.status === "in-consultation")
        ) {
          const consultIdx = prev.findIndex(
            (p) => p.status === "in-consultation"
          );
          if (consultIdx !== -1) {
            const updated = [...prev];
            updated.splice(consultIdx, 1); // Remove completed patient
            return updated;
          }
        }

        // Disabled adding new random patients to ensure we only show real DB data
        // if (prev.length < 12) {
        //   return [...prev, generatePatient()];
        // }

        return prev;
      });
    }, patientArrivalInterval);

    return () => clearInterval(interval);
  }, [enabled, patientArrivalInterval]);

  // Update wait times
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      setPatients((prev) =>
        prev.map((p) =>
          p.status === "waiting" ? { ...p, waitTime: p.waitTime + 1 } : p
        )
      );
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [enabled]);

  // Alert simulation
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        // 40% chance of new alert
        setAlerts((prev) => {
          const newAlert = generateAlert();
          const updated = [newAlert, ...prev].slice(0, 10); // Keep last 10 alerts
          return updated;
        });
      }
    }, alertInterval);

    return () => clearInterval(interval);
  }, [enabled, alertInterval]);

  // AI event simulation
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      setAIEvents((prev) => {
        const newEvent = generateAIEvent();
        const updated = [newEvent, ...prev].slice(0, 20); // Keep last 20 events
        return updated;
      });
    }, aiEventInterval);

    return () => clearInterval(interval);
  }, [enabled, aiEventInterval]);

  // Metrics update simulation
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        waitingPatients: patients.filter((p) => p.status === "waiting").length,
        avgWaitTime: Math.max(
          15,
          prev.avgWaitTime + (Math.random() > 0.5 ? 1 : -1)
        ),
        bedOccupancy: Math.min(
          95,
          Math.max(60, prev.bedOccupancy + (Math.random() - 0.5) * 3)
        ),
        aiRecommendations: prev.aiRecommendations + 1,
        consultationsToday:
          prev.consultationsToday + (Math.random() > 0.7 ? 1 : 0),
      }));
    }, metricUpdateInterval);

    return () => clearInterval(interval);
  }, [enabled, metricUpdateInterval, patients]);

  const acknowledgeAlert = useCallback((alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, acknowledged: true } : a))
    );
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
