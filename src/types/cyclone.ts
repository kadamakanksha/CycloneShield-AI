export type CycloneCategory =
  | 'Tropical Storm'
  | 'Category 1'
  | 'Category 2'
  | 'Category 3'
  | 'Category 4'
  | 'Category 5';

export type PopulationDensity = 'Low' | 'Medium' | 'High';

export type InfrastructureType =
  | 'Roads'
  | 'Bridges'
  | 'Power'
  | 'Hospitals'
  | 'Water Supply'
  | 'Telecommunications';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface CycloneInput {
  location: string;
  cycloneCategory: CycloneCategory;
  windSpeed: number; // in km/h
  rainfall: number; // in mm
  stormSurge: number; // in meters
  populationDensity: PopulationDensity;
  infrastructure: InfrastructureType[];
}

export interface VulnerableNode {
  id: string;
  name: string;
  type: InfrastructureType;
  risk: RiskLevel;
  failProbability: number; // 0-100%
  reason: string;
  mitigation: string;
  lat?: number;
  lng?: number;
  status: 'Vulnerable' | 'Breached' | 'Protected' | 'Offline';
}

export interface PriorityArea {
  id: string;
  name: string;
  priority: 'PRIORITY 1' | 'PRIORITY 2' | 'PRIORITY 3';
  action: string;
  status: 'Critical' | 'Warning' | 'Alert' | 'Secured';
  description: string;
  evacuationPercent?: number;
}

export interface InfrastructureStatusItem {
  category: InfrastructureType | 'Transit Networks' | 'Roads & Transit';
  operablePercent: number; // 0-100%
  risk: RiskLevel;
  reason: string;
  details: string;
  atRiskUnits?: number;
  totalUnits?: number;
}

export interface AIRecommendation {
  id: string;
  title: string;
  action: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  icon: string;
  timeframe?: string;
  dispatched?: boolean;
}

export interface TimelineProjection {
  surge: string;
  wind: string;
  status: string;
  riskLevel: RiskLevel;
  stormCenter: { x: number; y: number }; // percentage on map
}

export interface PreparednessPosture {
  sheltersActive: number;
  shelteredCitizens: number;
  shelterCapacityPercent: number;
  quickResponseUnits: number;
  deployedPercent: number;
  waterReserveDays: number;
  stockpileReservePercent: number;
}

export interface CycloneAnalysisResult {
  location: string;
  cycloneCategory: CycloneCategory;
  parameters: {
    windSpeed: number;
    rainfall: number;
    stormSurge: number;
    populationDensity: PopulationDensity;
  };
  overallRisk: RiskLevel;
  overallScore: number; // 0-100
  infrastructureRisk: RiskLevel;
  infrastructureRiskPercent: number;
  floodRisk: RiskLevel;
  floodRiskPercent: number;
  transportRisk: RiskLevel;
  transportRiskPercent: number;
  powerRisk: RiskLevel;
  powerRiskPercent: number;
  riskSummary: string;
  projectedCivilianImpact: string;
  vulnerableInfrastructure: VulnerableNode[];
  priorityAreas: PriorityArea[];
  infrastructureStatus: InfrastructureStatusItem[];
  recommendations: AIRecommendation[];
  projectedTimeline: {
    t0: TimelineProjection;
    t6: TimelineProjection;
    t12: TimelineProjection;
    t24: TimelineProjection;
  };
  preparednessPosture: PreparednessPosture;
  briefingCode: string;
  timestamp: string;
  modelUsed: string;
}
