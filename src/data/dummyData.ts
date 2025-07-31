import { DeviceAnalysis, AnalysisBlock, HistoryItem } from '../types';

export const dummyAnalysisBlocks: AnalysisBlock[] = [
  {
    id: '1',
    title: 'Risk Management Plan',
    summary: 'Comprehensive risk management plan has been developed in accordance with ISO 14971. The plan identifies potential hazards associated with the medical device throughout its lifecycle, including manufacturing, installation, use, and disposal phases. Key risk control measures have been established to maintain acceptable risk levels.',
    completed: false
  },
  {
    id: '2',
    title: 'Design FMEA Analysis',
    summary: 'Design Failure Mode and Effects Analysis has been conducted to systematically evaluate potential failure modes of the device components. Critical failure modes have been identified with corresponding severity, occurrence, and detectability ratings. Risk Priority Numbers (RPN) have been calculated for prioritization of corrective actions.',
    completed: false
  },
  {
    id: '3',
    title: 'Hazard Identification',
    summary: 'Systematic hazard identification process has identified 23 potential hazards across mechanical, electrical, thermal, and biological categories. Each hazard has been assessed for its potential harm and likelihood of occurrence. Hazards include material biocompatibility, mechanical failure, and user error scenarios.',
    completed: false
  },
  {
    id: '4',
    title: 'Risk Assessment Matrix',
    summary: 'Risk assessment matrix has been populated with identified hazards and their associated risks. Probability and severity classifications follow ISO 14971 guidelines. Initial risk levels have been determined before implementation of risk control measures. 3 high-risk items require immediate attention.',
    completed: false
  },
  {
    id: '5',
    title: 'Risk Control Measures',
    summary: 'Risk control measures have been designed following the hierarchy of risk control: inherent safety by design, protective measures, and information for safety. Specific controls include design modifications, safety systems, alarms, and user training requirements. Residual risks have been evaluated.',
    completed: false
  },
  {
    id: '6',
    title: 'Clinical Evaluation Requirements',
    summary: 'Clinical evaluation requirements have been defined based on the risk profile and classification of the device. Literature review requirements, clinical investigation needs, and post-market surveillance activities have been outlined. Compliance with MDR clinical evaluation requirements confirmed.',
    completed: false
  }
];

export const dummyHistory: HistoryItem[] = [
  {
    id: '1',
    deviceName: 'CardioMonitor Pro X1',
    version: 3,
    createdAt: new Date('2024-01-15'),
    status: 'completed'
  },
  {
    id: '2',
    deviceName: 'Dental Implant System',
    version: 2,
    createdAt: new Date('2024-01-10'),
    status: 'completed'
  },
  {
    id: '3',
    deviceName: 'Surgical Robot Arm',
    version: 1,
    createdAt: new Date('2024-01-05'),
    status: 'in-progress'
  },
  {
    id: '4',
    deviceName: 'Blood Glucose Meter',
    version: 4,
    createdAt: new Date('2023-12-20'),
    status: 'completed'
  },
  {
    id: '5',
    deviceName: 'MRI Scanner Module',
    version: 1,
    createdAt: new Date('2023-12-15'),
    status: 'completed'
  }
];

export const dummyAnalysisData: DeviceAnalysis = {
  id: '1',
  deviceName: 'CardioMonitor Pro X1',
  description: 'Advanced cardiac monitoring device with real-time ECG analysis',
  intendedUse: 'Continuous cardiac monitoring in hospital and home care settings',
  materials: 'Medical-grade silicone, titanium electrodes, ABS plastic housing',
  technicalSpecs: 'Operating frequency: 50-100 Hz, Battery life: 72 hours, IP65 rated',
  uploadedFiles: ['device_specifications.pdf', 'technical_drawings.dwg'],
  createdAt: new Date(),
  version: 1,
  status: 'completed'
};