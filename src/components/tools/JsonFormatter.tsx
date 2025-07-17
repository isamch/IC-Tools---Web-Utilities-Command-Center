
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState(2);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
    } catch (error) {
      setOutput('Invalid JSON format');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (error) {
      setOutput('Invalid JSON format');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          JSON Input
        </label>
        <TextInput
          value={input}
          onChange={setInput}
          placeholder="Enter JSON to format..."
          rows={10}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Indentation (spaces)
        </label>
        <input
          type="number"
          value={indent}
          onChange={(e) => setIndent(Number(e.target.value))}
          className="w-32 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          min="0"
          max="8"
        />
      </div>
      
      <div className="flex gap-4">
        <Button onClick={formatJson}>Format JSON</Button>
        <Button onClick={minifyJson} variant="secondary">Minify JSON</Button>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Formatted JSON
        </label>
        <OutputArea value={output} rows={10} />
      </div>
    </div>
  );
};
