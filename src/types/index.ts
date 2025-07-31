export interface DeviceAnalysis {
  id: string;
  deviceName: string;
  description: string;
  intendedUse: string;
  materials: string;
  technicalSpecs: string;
  uploadedFiles: string[];
  createdAt: Date;
  version: number;
  status: 'completed' | 'in-progress' | 'draft';
}

export interface AnalysisBlock {
  id: string;
  title: string;
  summary: string;
  completed: boolean;
}

export interface HistoryItem {
  id: string;
  deviceName: string;
  version: number;
  createdAt: Date;
  status: 'completed' | 'in-progress' | 'draft';
}