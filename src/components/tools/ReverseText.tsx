
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const ReverseText: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const reverseText = () => {
    const reversed = input.split('').reverse().join('');
    setOutput(reversed);
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
          placeholder="Enter text to reverse..."
        />
      </div>
      
      <Button onClick={reverseText}>Reverse Text</Button>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Reversed Text
        </label>
        <OutputArea value={output} />
      </div>
    </div>
  );
};
