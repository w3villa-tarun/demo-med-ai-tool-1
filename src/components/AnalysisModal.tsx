import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Upload, FileText, X } from 'lucide-react';
import { DeviceAnalysis } from '../types';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartAnalysis: (data: Omit<DeviceAnalysis, 'id' | 'createdAt' | 'version' | 'status'>) => void;
}

export const AnalysisModal: React.FC<AnalysisModalProps> = ({
  isOpen,
  onClose,
  onStartAnalysis
}) => {
  const [formData, setFormData] = useState({
    deviceName: '',
    description: '',
    intendedUse: '',
    materials: '',
    technicalSpecs: '',
    uploadedFiles: [] as string[]
  });

  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const fileNames = files.map(file => file.name);
    setFormData(prev => ({ 
      ...prev, 
      uploadedFiles: [...prev.uploadedFiles, ...fileNames]
    }));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const fileNames = files.map(file => file.name);
      setFormData(prev => ({ 
        ...prev, 
        uploadedFiles: [...prev.uploadedFiles, ...fileNames]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    if (!formData.deviceName.trim()) return;
    onStartAnalysis(formData);
    setFormData({
      deviceName: '',
      description: '',
      intendedUse: '',
      materials: '',
      technicalSpecs: '',
      uploadedFiles: []
    });
  };

  const isFormValid = formData.deviceName.trim().length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            New Risk Analysis
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="deviceName" className="text-sm font-medium text-gray-700">
                Device Name *
              </Label>
              <Input
                id="deviceName"
                value={formData.deviceName}
                onChange={(e) => handleInputChange('deviceName', e.target.value)}
                placeholder="e.g., CardioMonitor Pro X1"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Device Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Provide a detailed description of the medical device..."
                className="mt-1 min-h-[80px]"
              />
            </div>

            <div>
              <Label htmlFor="intendedUse" className="text-sm font-medium text-gray-700">
                Intended Use
              </Label>
              <Textarea
                id="intendedUse"
                value={formData.intendedUse}
                onChange={(e) => handleInputChange('intendedUse', e.target.value)}
                placeholder="Describe the intended use and target patient population..."
                className="mt-1 min-h-[80px]"
              />
            </div>

            <div>
              <Label htmlFor="materials" className="text-sm font-medium text-gray-700">
                Materials Used
              </Label>
              <Textarea
                id="materials"
                value={formData.materials}
                onChange={(e) => handleInputChange('materials', e.target.value)}
                placeholder="List all materials that come in contact with the patient..."
                className="mt-1 min-h-[60px]"
              />
            </div>

            <div>
              <Label htmlFor="technicalSpecs" className="text-sm font-medium text-gray-700">
                Technical Specifications
              </Label>
              <Textarea
                id="technicalSpecs"
                value={formData.technicalSpecs}
                onChange={(e) => handleInputChange('technicalSpecs', e.target.value)}
                placeholder="Include power requirements, operating conditions, performance specifications..."
                className="mt-1 min-h-[80px]"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Upload Documents
            </Label>
            <Card 
              className={`border-2 border-dashed p-6 text-center transition-colors ${
                dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Drag and drop files here, or click to select
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.docx,.doc,.txt"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Choose Files
              </Button>
              <p className="text-xs text-gray-400 mt-2">
                Supported formats: PDF, DOCX, DOC, TXT
              </p>
            </Card>

            {formData.uploadedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData.uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">{file}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Start Analysis
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};