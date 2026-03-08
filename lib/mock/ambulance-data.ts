// Mock Data for Ambulance Automation

export interface Ambulance {
  id: string;
  vehicleId: string;
  driver: string;
  paramedic: string;
  status: 'available' | 'dispatch' | 'transit' | 'on-scene' | 'patient-transfer' | 'maintenance' | 'idle';
  location: { lat: number; lng: number };
  fuelLevel: number;
  equipmentStatus: 'ready' | 'warning' | 'critical';
  lastMaintenance: string;
}

export interface EmergencyCall {
  id: string;
  type: string;
  severity: 'critical' | 'urgent' | 'routine';
  location: { lat: number; lng: number; address: string };
  timestamp: string;
  assignedAmbulanceId?: string;
  hospitalId?: string;
  status: 'pending' | 'dispatched' | 'active' | 'completed';
}

export interface Hospital {
  id: string;
  name: string;
  capacity: number;
  occupancy: number;
  specialties: string[];
  location: { lat: number; lng: number };
}

export const mockAmbulances: Ambulance[] = [
  {
    id: 'amb-001',
    vehicleId: 'KA-01-AM-1024',
    driver: 'Ramesh Singh',
    paramedic: 'Anjali Sharma',
    status: 'dispatch',
    location: { lat: 12.9716, lng: 77.5946 },
    fuelLevel: 85,
    equipmentStatus: 'ready',
    lastMaintenance: '2026-02-15',
  },
  {
    id: 'amb-002',
    vehicleId: 'KA-01-AM-2048',
    driver: 'Suresh Kumar',
    paramedic: 'Priya Verma',
    status: 'available',
    location: { lat: 12.9352, lng: 77.6245 },
    fuelLevel: 92,
    equipmentStatus: 'ready',
    lastMaintenance: '2026-03-01',
  },
  {
    id: 'amb-003',
    vehicleId: 'KA-01-AM-3072',
    driver: 'Vikram AD',
    paramedic: 'Meena K',
    status: 'patient-transfer',
    location: { lat: 12.9538, lng: 77.5834 },
    fuelLevel: 45,
    equipmentStatus: 'warning',
    lastMaintenance: '2026-01-20',
  },
  {
    id: 'amb-004',
    vehicleId: 'KA-01-AM-4096',
    driver: 'Mohammed Ali',
    paramedic: 'Deepak S',
    status: 'maintenance',
    location: { lat: 12.9279, lng: 77.6271 },
    fuelLevel: 10,
    equipmentStatus: 'critical',
    lastMaintenance: '2026-03-08',
  },
];

export const mockEmergencyCalls: EmergencyCall[] = [
  {
    id: 'call-101',
    type: 'Cardiac Arrest',
    severity: 'critical',
    location: { lat: 12.9800, lng: 77.6000, address: 'Indiranagar 10th Main' },
    timestamp: '2026-03-08T16:20:00Z',
    assignedAmbulanceId: 'amb-001',
    status: 'active',
  },
  {
    id: 'call-102',
    type: 'Road Accident',
    severity: 'urgent',
    location: { lat: 12.9100, lng: 77.6400, address: 'HSR Layout Sector 2' },
    timestamp: '2026-03-08T16:35:00Z',
    status: 'pending',
  },
];

export const mockHospitals: Hospital[] = [
  {
    id: 'hosp-001',
    name: 'Apollo Hospital',
    capacity: 50,
    occupancy: 42,
    specialties: ['Cardiology', 'Trauma'],
    location: { lat: 12.9592, lng: 77.6974 },
  },
  {
    id: 'hosp-002',
    name: 'Manipal Hospital',
    capacity: 100,
    occupancy: 95,
    specialties: ['Neurology', 'Internal Medicine'],
    location: { lat: 12.9554, lng: 77.6387 },
  },
];

export const getStatusColor = (status: Ambulance['status']) => {
  switch (status) {
    case 'dispatch': return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'available': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    case 'patient-transfer': return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'maintenance': return 'text-red-600 bg-red-50 border-red-200';
    case 'idle': return 'text-slate-600 bg-slate-50 border-slate-200';
    default: return 'text-slate-600 bg-slate-50 border-slate-200';
  }
};
