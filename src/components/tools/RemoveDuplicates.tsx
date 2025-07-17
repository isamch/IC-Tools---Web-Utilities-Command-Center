
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const RemoveDuplicates: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(true);

  const removeDuplicates = () => {
    const lines = input.split('\n');
    const unique = caseSensitive 
      ? [...new Set(lines)]
      : lines.filter((line, index, arr) => 
          arr.findIndex(item => item.toLowerCase() === line.toLowerCase()) === index
        );
    setOutput(unique.join('\n'));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Input Text (one item per line)
        </label>
        <TextInput
          value={input}
          onChange={setInput}
          placeholder="Enter text with duplicates..."
        />
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="caseSensitive"
          checked={caseSensitive}
          onChange={(e) => setCaseSensitive(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="caseSensitive" className="text-sm text-gray-700">
          Case sensitive
        </label>
      </div>
      
      <Button onClick={removeDuplicates}>Remove Duplicates</Button>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Unique Items
        </label>
        <OutputArea value={output} />
      </div>
    </div>
  );
};
