
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const ExtractNumbers: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const extractNumbers = () => {
    const numberRegex = /-?\d+\.?\d*/g;
    const matches = input.match(numberRegex) || [];
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
          placeholder="Enter text containing numbers..."
        />
      </div>
      
      <Button onClick={extractNumbers}>Extract Numbers</Button>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Extracted Numbers
        </label>
        <OutputArea value={output} />
      </div>
    </div>
  );
};
