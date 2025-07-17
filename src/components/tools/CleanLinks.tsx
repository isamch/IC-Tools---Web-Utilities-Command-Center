
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const CleanLinks: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const cleanLinks = () => {
    const lines = input.split('\n');
    const cleaned = lines.map(line => {
      let url = line.trim();
      if (!url) return url;
      
      try {
        const urlObj = new URL(url);
        // Remove common tracking parameters
        const trackingParams = [
          'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
          'fbclid', 'gclid', 'gclsrc', 'dclid', 'msclkid', 'ref', 'referrer'
        ];
        
        trackingParams.forEach(param => {
          urlObj.searchParams.delete(param);
        });
        
        return urlObj.toString();
      } catch {
        return url; // Return original if not a valid URL
      }
    });
    
    setOutput(cleaned.join('\n'));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URLs to Clean
        </label>
        <TextInput
          value={input}
          onChange={setInput}
          placeholder="Enter URLs with tracking parameters..."
        />
      </div>
      
      <Button onClick={cleanLinks}>Clean Links</Button>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cleaned URLs
        </label>
        <OutputArea value={output} />
      </div>
    </div>
  );
};
