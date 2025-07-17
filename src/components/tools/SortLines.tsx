
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const SortLines: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const sortAscending = () => {
    const lines = input.split('\n').filter(line => line.trim());
    const sorted = lines.sort();
    setOutput(sorted.join('\n'));
  };

  const sortDescending = () => {
    const lines = input.split('\n').filter(line => line.trim());
    const sorted = lines.sort().reverse();
    setOutput(sorted.join('\n'));
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
          placeholder="Enter lines to sort..."
        />
      </div>
      
      <div className="flex gap-4">
        <Button onClick={sortAscending}>Sort A-Z</Button>
        <Button onClick={sortDescending} variant="secondary">Sort Z-A</Button>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sorted Lines
        </label>
        <OutputArea value={output} />
      </div>
    </div>
  );
};
