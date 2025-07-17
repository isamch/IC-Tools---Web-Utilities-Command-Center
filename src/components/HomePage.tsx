import React, { useState, useEffect } from 'react';
import { Clock, Activity, Zap, Shield, Target, Terminal } from 'lucide-react';
import { Tool, tools } from '../data/tools';

interface RecentTool {
  id: string;
  name: string;
  category: string;
  lastUsed: Date;
  usageCount: number;
}

interface HomePageProps {
  onSelectTool?: (tool: Tool) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectTool }) => {
  const [recentTools, setRecentTools] = useState<RecentTool[]>([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    toolsUsed: 0,
    timeActive: 0,
  });

  useEffect(() => {
    // Load recent tools from localStorage
    const stored = localStorage.getItem('recentTools');
    if (stored) {
      setRecentTools(JSON.parse(stored));
    }

    // Load stats
    const storedStats = localStorage.getItem('userStats');
    if (storedStats) {
      setStats(JSON.parse(storedStats));
    }
  }, []);

  const quickActions = [
    { name: 'Extract Links', icon: Target, category: 'Text Tools', toolId: 'extract-links' },
    { name: 'JSON Formatter', icon: Terminal, category: 'Developer Tools', toolId: 'json-formatter' },
    { name: 'Password Generator', icon: Shield, category: 'Security', toolId: 'password-generator' },
    { name: 'Base64 Encode/Decode', icon: Zap, category: 'Utilities', toolId: 'base64encode-decode' },
  ];

  const handleQuickActionClick = (toolId: string) => {
    if (onSelectTool) {
      // Find the tool in the tools data
      let selectedTool: Tool | undefined;
      
      for (const category of tools) {
        selectedTool = category.items.find(tool => tool.id === toolId);
        if (selectedTool) break;
      }
      
      if (selectedTool) {
        onSelectTool(selectedTool);
      }
    }
  };

  return (
    <div className="bg-background tactical-grid">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary font-mono">IC TOOLS</h1>
              <p className="text-muted-foreground font-mono text-sm mt-1">
                WEB UTILITIES COMMAND CENTER
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full status-online"></div>
                <span className="text-xs font-mono text-muted-foreground">SYSTEM ONLINE</span>
              </div>
              <div className="text-xs font-mono text-muted-foreground">
                {new Date().toLocaleString('en-US', { 
                  timeZone: 'UTC',
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                }).replace(',', '')} UTC
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start" style={{ gridTemplateRows: 'minmax(0, 1fr)' }}>
          {/* Mission Status */}
          <div className="lg:col-span-2">
            <div className="tactical-card h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-primary font-mono">MISSION STATUS</h2>
                <Activity className="w-5 h-5 text-primary" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-secondary/50 rounded p-4 border border-border">
                  <div className="text-2xl font-bold text-primary font-mono">{stats.totalSessions}</div>
                  <div className="text-xs text-muted-foreground font-mono">TOTAL SESSIONS</div>
                </div>
                <div className="bg-secondary/50 rounded p-4 border border-border">
                  <div className="text-2xl font-bold text-primary font-mono">{stats.toolsUsed}</div>
                  <div className="text-xs text-muted-foreground font-mono">TOOLS DEPLOYED</div>
                </div>
                <div className="bg-secondary/50 rounded p-4 border border-border">
                  <div className="text-2xl font-bold text-primary font-mono">{Math.floor(stats.timeActive / 60)}h</div>
                  <div className="text-xs text-muted-foreground font-mono">TIME ACTIVE</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex-1">
                <h3 className="text-sm font-bold text-foreground font-mono mb-3">QUICK DEPLOY</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickActionClick(action.toolId)}
                      className="bg-secondary/50 hover:bg-secondary border border-border rounded p-3 text-left transition-colors"
                    >
                      <action.icon className="w-4 h-4 text-primary mb-2" />
                      <div className="text-xs font-mono text-foreground">{action.name}</div>
                      <div className="text-xs text-muted-foreground font-mono">{action.category}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="tactical-card h-full flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-primary font-mono">RECENT ACTIVITY</h2>
              <Clock className="w-5 h-5 text-primary" />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2" style={{ maxHeight: 'calc(100vh - 400px)' }}>
              {recentTools.length > 0 ? (
                recentTools.slice(0, 8).map((tool, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-secondary/30 rounded border border-border">
                    <div>
                      <div className="text-sm font-mono text-foreground">{tool.name}</div>
                      <div className="text-xs text-muted-foreground font-mono">{tool.category}</div>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {new Date(tool.lastUsed).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <div className="text-muted-foreground font-mono text-sm">NO RECENT ACTIVITY</div>
                  <div className="text-muted-foreground font-mono text-xs mt-1">
                    START USING TOOLS TO SEE ACTIVITY
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tool Categories Overview */}
        <div className="mt-6 mb-8">
          <div className="tactical-card">
            <h2 className="text-lg font-bold text-primary font-mono mb-4">AVAILABLE OPERATIONS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'TEXT OPERATIONS', count: 18, status: 'online' },
                { name: 'WEB UTILITIES', count: 8, status: 'online' },
                { name: 'DEVELOPER TOOLS', count: 8, status: 'online' },
                { name: 'SECURITY TOOLS', count: 3, status: 'online' },
              ].map((category, index) => (
                <div key={index} className="bg-secondary/50 rounded p-4 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-mono text-foreground">{category.name}</div>
                    <div className={`w-2 h-2 rounded-full status-${category.status}`}></div>
                  </div>
                  <div className="text-xl font-bold text-primary font-mono">{category.count}</div>
                  <div className="text-xs text-muted-foreground font-mono">TOOLS AVAILABLE</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
