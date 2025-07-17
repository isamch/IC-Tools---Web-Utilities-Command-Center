
import React from 'react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  children: React.ReactNode;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  icon: Icon,
  children,
}) => {
  return (
    <div className="tactical-card">
      <div className="border-b border-border pb-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary/20 rounded border border-primary/30">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground font-mono">{title.toUpperCase()}</h2>
            <p className="text-muted-foreground font-mono text-sm mt-1">{description}</p>
          </div>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
};
