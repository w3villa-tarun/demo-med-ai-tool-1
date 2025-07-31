import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Activity, History, Settings, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeView: 'analyze' | 'history';
  onViewChange: (view: 'analyze' | 'history') => void;
  onAnalyzeClick: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onViewChange,
  onAnalyzeClick,
  isOpen,
  onToggle
}) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 lg:hidden"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0 lg:static lg:z-auto"
      )}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <Activity className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">RiskAnalyzer</h1>
              <p className="text-xs text-gray-500">ISO 14971 Compliant</p>
            </div>
          </div>

          <nav className="space-y-2">
            <Button
              variant={activeView === 'analyze' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => {
                onAnalyzeClick();
                onToggle();
              }}
            >
              <Activity className="h-4 w-4 mr-2" />
              New Analysis
            </Button>
            
            <Button
              variant={activeView === 'history' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => {
                onViewChange('history');
                onToggle();
              }}
            >
              <History className="h-4 w-4 mr-2" />
              Analysis History
            </Button>
          </nav>

          <Separator className="my-6" />

          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" disabled>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>

          <Card className="mt-8 p-4 bg-blue-50 border-blue-200">
            <div className="text-xs text-blue-600 font-medium mb-1">
              ISO 14971:2019
            </div>
            <div className="text-xs text-blue-700">
              Medical devices — Application of risk management to medical devices
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};