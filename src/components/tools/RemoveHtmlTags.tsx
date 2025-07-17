
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const RemoveHtmlTags: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const removeHtmlTags = () => {
    const stripped = input.replace(/<[^>]*>/g, '');
    setOutput(stripped);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          HTML Input
        </label>
        <TextInput
          value={input}
          onChange={setInput}
          placeholder="Enter HTML text..."
        />
      </div>
      
      <Button onClick={removeHtmlTags}>Remove HTML Tags</Button>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Plain Text Output
        </label>
        <OutputArea value={output} />
      </div>
    </div>
  );
};
