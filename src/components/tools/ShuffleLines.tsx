
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const ShuffleLines: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const shuffleLines = () => {
    const lines = input.split('\n').filter(line => line.trim());
    const shuffled = [...lines].sort(() => Math.random() - 0.5);
    setOutput(shuffled.join('\n'));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Input Lines
        </label>
        <TextInput
          value={input}
          onChange={setInput}
          placeholder="Enter lines to shuffle..."
        />
      </div>
      
      <Button onClick={shuffleLines}>Shuffle Lines</Button>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Shuffled Lines
        </label>
        <OutputArea value={output} />
      </div>
    </div>
  );
};
