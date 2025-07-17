
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const CaseConverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const toUpperCase = () => setOutput(input.toUpperCase());
  const toLowerCase = () => setOutput(input.toLowerCase());
  const toTitleCase = () => {
    const titleCase = input.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
    setOutput(titleCase);
  };
  const toSentenceCase = () => {
    const sentenceCase = input.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => 
      c.toUpperCase()
    );
    setOutput(sentenceCase);
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
          placeholder="Enter text to convert case..."
        />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button onClick={toUpperCase}>UPPERCASE</Button>
        <Button onClick={toLowerCase} variant="secondary">lowercase</Button>
        <Button onClick={toTitleCase} variant="secondary">Title Case</Button>
        <Button onClick={toSentenceCase} variant="secondary">Sentence case</Button>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Converted Text
        </label>
        <OutputArea value={output} />
      </div>
    </div>
  );
};
