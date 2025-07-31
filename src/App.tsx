import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { AnalysisModal } from './components/AnalysisModal';
import { AnalysisResults } from './components/AnalysisResults';
import { HistoryView } from './components/HistoryView';
import { DeviceAnalysis, HistoryItem } from './types';

function App() {
  const [activeView, setActiveView] = useState<'analyze' | 'history'>('analyze');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<DeviceAnalysis | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleAnalyzeClick = () => {
    setIsModalOpen(true);
    setActiveView('analyze');
  };

  const handleStartAnalysis = (data: Omit<DeviceAnalysis, 'id' | 'createdAt' | 'version' | 'status'>) => {
    const analysis: DeviceAnalysis = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      version: 1,
      status: 'in-progress'
    };
    
    setCurrentAnalysis(analysis);
    setIsModalOpen(false);
    setIsAnalyzing(true);
    setActiveView('analyze');
  };

  const handleHistoryItemSelect = (item: HistoryItem) => {
    // Simulate loading a previous analysis
    const mockAnalysis: DeviceAnalysis = {
      id: item.id,
      deviceName: item.deviceName,
      description: 'Previously analyzed device',
      intendedUse: 'Medical monitoring and diagnosis',
      materials: 'Medical-grade materials',
      technicalSpecs: 'Standard specifications',
      uploadedFiles: [],
      createdAt: item.createdAt,
      version: item.version,
      status: item.status
    };
    
    setCurrentAnalysis(mockAnalysis);
    setIsAnalyzing(false); // Don't re-run analysis for historical items
    setActiveView('analyze');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        onAnalyzeClick={handleAnalyzeClick}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />
      
      <main className="flex-1 overflow-auto lg:ml-0">
        <div className="p-6 pt-16 lg:pt-6">
          {activeView === 'analyze' ? (
            <AnalysisResults
              deviceName={currentAnalysis?.deviceName || 'Medical Device'}
              isAnalyzing={isAnalyzing}
            />
          ) : (
            <HistoryView onSelectItem={handleHistoryItemSelect} />
          )}
        </div>
      </main>

      <AnalysisModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStartAnalysis={handleStartAnalysis}
      />
    </div>
  );
}

export default App;