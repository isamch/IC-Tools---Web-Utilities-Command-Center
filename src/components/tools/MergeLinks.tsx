
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const MergeLinks: React.FC = () => {
  const [input, setInput] = useState('');
  const [separator, setSeparator] = useState(', ');
  const [output, setOutput] = useState('');

  const mergeLinks = () => {
    const lines = input.split('\n').filter(line => line.trim());
    setOutput(lines.join(separator));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Links (one per line)
        </label>
        <TextInput
          value={input}
          onChange={setInput}
          placeholder="Enter links, one per line..."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Separator
        </label>
        <input
          type="text"
          value={separator}
          onChange={(e) => setSeparator(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter separator (e.g., ', ', ' | ', etc.)"
        />
      </div>
      
      <Button onClick={mergeLinks}>Merge Links</Button>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Merged Output
        </label>
        <OutputArea value={output} />
      </div>
    </div>
  );
};
