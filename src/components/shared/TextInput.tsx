
import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  label?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder = "Enter text here...",
  rows = 6,
  className = "",
  label,
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-mono text-foreground font-medium">
          {label.toUpperCase()}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`tactical-input w-full resize-none ${className}`}
      />
    </div>
  );
};
