
import React, { useState } from 'react';
import { Button } from '../shared/Button';

export const RgbHexConverter: React.FC = () => {
  const [rgb, setRgb] = useState({ r: 255, g: 0, b: 0 });
  const [hex, setHex] = useState('#FF0000');
  const [rgbInput, setRgbInput] = useState('255, 0, 0');
  const [hexInput, setHexInput] = useState('#FF0000');

  const rgbToHex = () => {
    try {
      const values = rgbInput.split(',').map(v => parseInt(v.trim()));
      if (values.length !== 3 || values.some(v => isNaN(v) || v < 0 || v > 255)) {
        throw new Error('Invalid RGB values');
      }
      
      const hexValue = '#' + values.map(v => 
        v.toString(16).padStart(2, '0').toUpperCase()
      ).join('');
      
      setHex(hexValue);
      setRgb({ r: values[0], g: values[1], b: values[2] });
    } catch {
      setHex('Invalid RGB format');
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
      
      setRgb({ r, g, b });
      setRgbInput(`${r}, ${g}, ${b}`);
    } catch {
      setRgbInput('Invalid HEX format');
    }
  };

  const currentColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div 
          className="w-32 h-32 rounded-xl border-4 border-white shadow-lg mx-auto mb-4"
          style={{ backgroundColor: currentColor }}
        />
        <p className="text-sm text-gray-600">Preview Color</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">RGB to HEX</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              RGB Values (r, g, b)
            </label>
            <input
              type="text"
              value={rgbInput}
              onChange={(e) => setRgbInput(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="255, 0, 0"
            />
          </div>
          <Button onClick={rgbToHex}>Convert to HEX</Button>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              HEX Result
            </label>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono">
              {hex}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">HEX to RGB</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              HEX Value
            </label>
            <input
              type="text"
              value={hexInput}
              onChange={(e) => setHexInput(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="#FF0000"
            />
          </div>
          <Button onClick={hexToRgb} variant="secondary">Convert to RGB</Button>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              RGB Result
            </label>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono">
              {rgbInput}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
