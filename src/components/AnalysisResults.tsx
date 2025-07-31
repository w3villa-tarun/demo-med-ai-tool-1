import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Download, CheckCircle, Clock, Loader2 } from 'lucide-react';
import { AnalysisBlock } from '../types';
import { dummyAnalysisBlocks } from '../data/dummyData';

interface AnalysisResultsProps {
  deviceName: string;
  isAnalyzing: boolean;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  deviceName,
  isAnalyzing
}) => {
  const [blocks, setBlocks] = useState<AnalysisBlock[]>([]);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(-1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isAnalyzing) return;

    setBlocks([]);
    setCurrentBlockIndex(-1);
    setProgress(0);

    const processBlocks = async () => {
      for (let i = 0; i < dummyAnalysisBlocks.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay between blocks
        
        setCurrentBlockIndex(i);
        setBlocks(prev => [...prev, { ...dummyAnalysisBlocks[i], completed: false }]);
        
        await new Promise(resolve => setTimeout(resolve, 3000)); // 3 seconds to "complete" the block
        
        setBlocks(prev => prev.map((block, index) => 
          index === i ? { ...block, completed: true } : block
        ));
        
        setProgress(((i + 1) / dummyAnalysisBlocks.length) * 100);
      }
    };

    processBlocks();
  }, [isAnalyzing]);

  if (!isAnalyzing && blocks.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>Click "New Analysis" to start a risk assessment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Risk Analysis: {deviceName}
            </h2>
            <p className="text-sm text-gray-600">
              ISO 14971:2019 Compliant Assessment
            </p>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            v1.0
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Analysis Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="space-y-4">
        {blocks.map((block, index) => {
          const isActive = currentBlockIndex === index && !block.completed;
          
          return (
            <Card key={block.id} className={`p-6 transition-all duration-300 ${
              isActive ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
            }`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {block.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  ) : isActive ? (
                    <Loader2 className="h-5 w-5 text-blue-500 animate-spin mt-0.5" />
                  ) : (
                    <Clock className="h-5 w-5 text-gray-300 mt-0.5" />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900">
                    {block.title}
                  </h3>
                </div>
                
                {block.completed && (
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                )}
              </div>
              
              {(block.completed || isActive) && (
                <div className="ml-8">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {block.summary}
                  </p>
                  
                  {isActive && (
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Processing analysis...</span>
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};