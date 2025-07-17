import React, { useState } from 'react';
import { Button } from '../shared/Button';

export const RgbHexConverter: React.FC = () => {
  const [rgbInput, setRgbInput] = useState('255,0,0');
  const [hexInput, setHexInput] = useState('#FF0000');
  const [rgbResult, setRgbResult] = useState('255,0,0');
  const [hexResult, setHexResult] = useState('#FF0000');

  const rgbToHex = () => {
    try {
      const values = rgbInput.split(',').map(v => parseInt(v.trim()));
      if (values.length !== 3 || values.some(v => isNaN(v) || v < 0 || v > 255)) {
        throw new Error('Invalid RGB values');
      }
      
      const hexValue = '#' + values.map(v => 
        v.toString(16).padStart(2, '0').toUpperCase()
      ).join('');
      
      setHexResult(hexValue);
    } catch {
      setHexResult('Invalid RGB format');
    }
  };

  const hexToRgb = () => {
    try {
      const cleanHex = hexInput.replace('#', '');
      if (cleanHex.length !== 6 || !/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
        throw new Error('Invalid hex format');
      }
      
      const r = parseInt(cleanHex.substr(0, 2), 16);
      const g = parseInt(cleanHex.substr(2, 2), 16);
      const b = parseInt(cleanHex.substr(4, 2), 16);
      
      setRgbResult(`${r}, ${g}, ${b}`);
    } catch {
      setRgbResult('Invalid HEX format');
    }
  };

  // Function to get current color for preview
  const getCurrentColor = () => {
    try {
      const values = rgbInput.split(',').map(v => parseInt(v.trim()));
      if (values.length === 3 && values.every(v => !isNaN(v) && v >= 0 && v <= 255)) {
        return `rgb(${values[0]}, ${values[1]}, ${values[2]})`;
      }
    } catch {
      // If parsing fails, return default red
    }
    return 'rgb(255, 0, 0)'; // Default red color
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div 
          className="w-32 rounded-xl border-4 border-border shadow-lg mx-auto mb-4"
          style={{ backgroundColor: getCurrentColor() }}
        />
        <p className="text-sm text-muted-foreground">Preview Color</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">RGB to HEX</h3>
          <div>
            <label className="tool-label">
              RGB Values (r, g, b)
            </label>
            <input
              type="text"
              value={rgbInput}
              onChange={(e) => setRgbInput(e.target.value)}
              className="tool-input"
              placeholder="255,0,0"
            />
          </div>
          <Button onClick={rgbToHex}>Convert to HEX</Button>
          <div>
            <label className="tool-label">
              HEX Result
            </label>
            <div className="p-3 bg-secondary border border-border rounded-lg font-mono text-muted-foreground">
              {hexResult}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">HEX to RGB</h3>
          <div>
            <label className="tool-label">
              HEX Value
            </label>
            <input
              type="text"
              value={hexInput}
              onChange={(e) => setHexInput(e.target.value)}
              className="tool-input"
              placeholder="#FF0000"
            />
          </div>
          <Button onClick={hexToRgb} variant="secondary">Convert to RGB</Button>
          <div>
            <label className="tool-label">
              RGB Result
            </label>
            <div className="p-3 bg-secondary border border-border rounded-lg font-mono text-muted-foreground">
              {rgbResult}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 