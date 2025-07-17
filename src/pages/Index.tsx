
import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ToolsContainer } from '../components/ToolsContainer';
import { HomePage } from '../components/HomePage';
import { tools, Tool } from '../data/tools';

const Index = () => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background tactical-grid">
      <div className="flex h-screen">
        <Sidebar
          tools={tools}
          selectedTool={selectedTool}
          onSelectTool={setSelectedTool}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onHome={() => setSelectedTool(null)}
        />
        
        <div className="flex-1 overflow-y-auto">
          {selectedTool ? (
            <ToolsContainer
              selectedTool={selectedTool}
              sidebarCollapsed={sidebarCollapsed}
            />
          ) : (
            <HomePage onSelectTool={setSelectedTool} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
