
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const FindReplace: React.FC = () => {
  const [input, setInput] = useState('');
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [output, setOutput] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);

  const findAndReplace = () => {
    if (!findText) {
      setOutput(input);
      return;
    }
    
    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
    const result = input.replace(regex, replaceText);
    setOutput(result);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="tool-label">
          Input Text
        </label>
        <TextInput
          value={input}
          onChange={setInput}
          placeholder="Enter text to search and replace..."
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="tool-label">
            Find
          </label>
          <input
            type="text"
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
            className="tool-input"
            placeholder="Text to find"
          />
        </div>
        <div>
          <label className="tool-label">
            Replace with
          </label>
          <input
            type="text"
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
            className="tool-input"
            placeholder="Replacement text"
          />
        </div>
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="caseSensitive"
          checked={caseSensitive}
          onChange={(e) => setCaseSensitive(e.target.checked)}
          className="tool-checkbox"
        />
        <label htmlFor="caseSensitive" className="text-sm text-foreground">
          Case sensitive
        </label>
      </div>
      
      <Button onClick={findAndReplace}>Find & Replace</Button>
      
      <div>
        <label className="tool-label">
          Result
        </label>
        <OutputArea value={output} />
      </div>
    </div>
  );
};
