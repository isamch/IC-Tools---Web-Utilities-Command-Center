
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
      // Basic CSS minification
      minified = input
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
        .replace(/\s*{\s*/g, '{') // Remove spaces around opening braces
        .replace(/\s*}\s*/g, '}') // Remove spaces around closing braces
        .replace(/\s*:\s*/g, ':') // Remove spaces around colons
        .replace(/\s*;\s*/g, ';') // Remove spaces around semicolons
        .replace(/\s*,\s*/g, ',') // Remove spaces around commas
        .trim();
    } else {
      // Basic JS minification
      minified = input
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
        .replace(/\/\/.*$/gm, '') // Remove single-line comments
        .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
        .replace(/\s*{\s*/g, '{') // Remove spaces around opening braces
        .replace(/\s*}\s*/g, '}') // Remove spaces around closing braces
        .replace(/\s*;\s*/g, ';') // Remove spaces around semicolons
        .replace(/\s*,\s*/g, ',') // Remove spaces around commas
        .replace(/\s*=\s*/g, '=') // Remove spaces around equals
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
