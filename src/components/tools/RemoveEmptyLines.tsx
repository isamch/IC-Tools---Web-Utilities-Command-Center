
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const RemoveEmptyLines: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const removeEmptyLines = () => {
    const lines = input.split('\n').filter(line => line.trim() !== '');
    setOutput(lines.join('\n'));
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
          placeholder="Enter text with empty lines..."
        />
      </div>
      
      <Button onClick={removeEmptyLines}>Remove Empty Lines</Button>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cleaned Text
        </label>
        <OutputArea value={output} />
      </div>
    </div>
  );
};
