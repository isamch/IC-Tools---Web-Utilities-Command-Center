
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const ExtractDomains: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const extractDomains = () => {
    const urls = input.split('\n').filter(url => url.trim());
    const domains = urls.map(url => {
      try {
        const urlObj = new URL(url.trim());
        return urlObj.hostname;
      } catch {
        return null;
      }
    }).filter(domain => domain !== null);
    
    const uniqueDomains = [...new Set(domains)];
    setOutput(uniqueDomains.join('\n'));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URLs (one per line)
        </label>
        <TextInput
          value={input}
          onChange={setInput}
          placeholder="Enter URLs to extract domains from..."
        />
      </div>
      
      <Button onClick={extractDomains}>Extract Domains</Button>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Extracted Domains
        </label>
        <OutputArea value={output} />
      </div>
    </div>
  );
};
