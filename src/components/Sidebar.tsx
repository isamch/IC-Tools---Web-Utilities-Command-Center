import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, Shield, Terminal, Globe, Mail, Wrench } from 'lucide-react';
import { ToolCategory, Tool } from '../data/tools';

interface SidebarProps {
  tools: ToolCategory[];
  selectedTool: Tool | null;
  onSelectTool: (tool: Tool) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onHome: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  tools,
  selectedTool,
  onSelectTool,
  collapsed,
  onToggleCollapse,
  onHome,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Text & Content']);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const categoryIcons: { [key: string]: React.ComponentType<any> } = {
    'Text & Content': Terminal,
    'Web & Link Utilities': Globe,
    'Developer Tools': Wrench,
    'Email Tools': Mail,
    'General Utilities': Shield,
  };

  return (
    <div className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-80'
    } flex flex-col h-full`}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border bg-sidebar-accent/20">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-sidebar-primary font-mono">IC TOOLS</h1>
              <p className="text-xs text-sidebar-foreground/70 font-mono">WEB UTILITIES</p>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-2 hover:bg-sidebar-accent rounded transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 text-sidebar-foreground" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-sidebar-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Home Button */}
      <div className="p-2 border-b border-sidebar-border">
        <button
          onClick={onHome}
          className={`w-full flex items-center p-3 rounded transition-colors font-mono text-sm ${
            !selectedTool
              ? 'bg-sidebar-primary text-sidebar-primary-foreground'
              : 'text-sidebar-foreground hover:bg-sidebar-accent'
          }`}
        >
          <Home className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span className="ml-3">COMMAND CENTER</span>}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-2">
        {tools.map((categoryData) => {
          const IconComponent = categoryIcons[categoryData.category] || Terminal;
          const isExpanded = expandedCategories.includes(categoryData.category);

          return (
            <div key={categoryData.category} className="mb-2">
              <button
                onClick={() => !collapsed && toggleCategory(categoryData.category)}
                className="w-full flex items-center p-2 text-sidebar-foreground hover:bg-sidebar-accent rounded transition-colors font-mono text-xs"
              >
                <IconComponent className="w-4 h-4 flex-shrink-0 text-sidebar-primary" />
                {!collapsed && (
                  <>
                    <span className="ml-3 flex-1 text-left">{categoryData.category.toUpperCase()}</span>
                    <div className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </>
                )}
              </button>

              {!collapsed && isExpanded && (
                <div className="ml-4 mt-1 space-y-1">
                  {categoryData.items.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => onSelectTool(tool)}
                      className={`w-full flex items-center p-2 rounded transition-colors font-mono text-xs ${
                        selectedTool?.id === tool.id
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent'
                      }`}
                    >
                      <tool.icon className="w-3 h-3 flex-shrink-0" />
                      <span className="ml-2 text-left">{tool.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <div className="text-xs text-sidebar-foreground/50 font-mono space-y-1">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full status-online mr-2"></div>
              SYSTEM OPERATIONAL
            </div>
            <div>v2.1.7 CLASSIFIED</div>
          </div>
        )}
      </div>
    </div>
  );
};
