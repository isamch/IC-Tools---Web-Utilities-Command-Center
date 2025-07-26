
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const SlugGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const generateSlug = () => {
    const lines = input.split('\n').filter(line => line.trim());
    const slugs = lines.map(line => {
      return line
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
    });
    setOutput(slugs.join('\n'));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text to Convert (one per line)
        </label>
        <TextInput
          value={input}
          onChange={setInput}
          placeholder="Enter text to convert to URL-friendly slugs..."
        />
      </div>
      
      <Button onClick={generateSlug}>Generate Slugs</Button>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URL-Friendly Slugs
        </label>
        <OutputArea value={output} />
      </div>
    </div>
  );
};
