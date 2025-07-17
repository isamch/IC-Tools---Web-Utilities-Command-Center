
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const ExtractLinks: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const extractLinks = () => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = input.match(urlRegex) || [];
    setOutput(matches.join('\n'));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Input Text
        </label>
        <TextInput
          value={input}
          onChange={setInput}
          placeholder="Paste text containing URLs here..."
        />
      </div>
      
      <Button onClick={extractLinks}>Extract Links</Button>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Extracted Links
        </label>
        <OutputArea value={output} />
      </div>
    </div>
  );
};
