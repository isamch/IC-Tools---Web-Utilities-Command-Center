
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const MinifyCssJs: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [type, setType] = useState<'css' | 'js'>('css');

  const minify = () => {
    let minified = input;
    
    if (type === 'css') {
      minified = input
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*{\s*/g, '{')
        .replace(/\s*}\s*/g, '}')
        .replace(/\s*:\s*/g, ':')
        .replace(/\s*;\s*/g, ';')
        .replace(/\s*,\s*/g, ',')
        .trim();
    } else {
      minified = input
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*$/gm, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*{\s*/g, '{')
        .replace(/\s*}\s*/g, '}')
        .replace(/\s*;\s*/g, ';')
        .replace(/\s*,\s*/g, ',')
        .replace(/\s*=\s*/g, '=')
        .trim();
    }
    
    setOutput(minified);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Code Type
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="css"
              checked={type === 'css'}
              onChange={(e) => setType(e.target.value as 'css' | 'js')}
              className="mr-2"
            />
            CSS
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="js"
              checked={type === 'js'}
              onChange={(e) => setType(e.target.value as 'css' | 'js')}
              className="mr-2"
            />
            JavaScript
          </label>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Code to Minify
        </label>
        <TextInput
          value={input}
          onChange={setInput}
          placeholder={`Enter ${type.toUpperCase()} code to minify...`}
          rows={10}
        />
      </div>
      
      <Button onClick={minify}>Minify Code</Button>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Minified Code
        </label>
        <OutputArea value={output} rows={10} />
      </div>
    </div>
  );
};
