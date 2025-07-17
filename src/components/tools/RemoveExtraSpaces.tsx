
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const RemoveExtraSpaces: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const removeExtraSpaces = () => {
    const cleaned = input.replace(/\s+/g, ' ').trim();
    setOutput(cleaned);
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
          placeholder="Enter text with extra spaces..."
        />
      </div>
      
      <Button onClick={removeExtraSpaces}>Remove Extra Spaces</Button>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cleaned Text
        </label>
        <OutputArea value={output} />
      </div>
    </div>
  );
};
