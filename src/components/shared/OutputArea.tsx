
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface OutputAreaProps {
  value: string;
  placeholder?: string;
  rows?: number;
  className?: string;
  label?: string;
}

export const OutputArea: React.FC<OutputAreaProps> = ({
  value,
  placeholder = "Output will appear here...",
  rows = 8,
  className = "",
  label,
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (value) {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        {label && (
          <label className="text-sm font-mono text-foreground font-medium">
            {label.toUpperCase()}
          </label>
        )}
        {value && (
          <button
            onClick={copyToClipboard}
            className="tactical-button flex items-center space-x-2 text-xs"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'COPIED' : 'COPY'}</span>
          </button>
        )}
      </div>
      <textarea
        value={value}
        placeholder={placeholder}
        rows={rows}
        readOnly
        className={`tactical-input w-full resize-none bg-secondary/50 ${className}`}
      />
    </div>
  );
};
