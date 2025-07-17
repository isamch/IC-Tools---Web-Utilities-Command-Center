
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const SplitLinks: React.FC = () => {
  const [input, setInput] = useState('');
  const [separator, setSeparator] = useState(',');
  const [output, setOutput] = useState('');

  const splitLinks = () => {
    const links = input.split(separator).map(link => link.trim()).filter(link => link);
    setOutput(links.join('\n'));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Merged Links
        </label>
        <TextInput
          value={input}
          onChange={setInput}
          placeholder="Enter merged links..."
          rows={4}
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
          placeholder="Enter separator to split on"
        />
      </div>
      
      <Button onClick={splitLinks}>Split Links</Button>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Split Output (one per line)
        </label>
        <OutputArea value={output} />
      </div>
    </div>
  );
};
