import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, FileText, MoreVertical } from 'lucide-react';
import { HistoryItem } from '../types';
import { dummyHistory } from '../data/dummyData';

interface HistoryViewProps {
  onSelectItem: (item: HistoryItem) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ onSelectItem }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Analysis History
        </h2>
        <p className="text-sm text-gray-600">
          View and manage your previous risk assessments
        </p>
      </div>

      <div className="grid gap-4">
        {dummyHistory.map((item) => (
          <Card 
            key={item.id} 
            className="p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelectItem(item)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-900">
                    {item.deviceName}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className={getStatusColor(item.status)}
                >
                  {item.status === 'in-progress' ? 'In Progress' : 
                   item.status === 'completed' ? 'Completed' : 'Draft'}
                </Badge>
                <Badge variant="secondary">
                  v{item.version}
                </Badge>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {dummyHistory.length === 0 && (
        <Card className="p-8 text-center">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No analyses yet
          </h3>
          <p className="text-gray-600 mb-4">
            Start your first risk assessment to see it here
          </p>
          <Button variant="outline">
            Create New Analysis
          </Button>
        </Card>
      )}
    </div>
  );
};