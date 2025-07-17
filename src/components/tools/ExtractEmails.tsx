
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const ExtractEmails: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const extractEmails = () => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const matches = input.match(emailRegex) || [];
    const uniqueEmails = [...new Set(matches)];
    setOutput(uniqueEmails.join('\n'));
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
          placeholder="Enter text containing email addresses..."
        />
      </div>
      
      <Button onClick={extractEmails}>Extract Emails</Button>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Extracted Emails
        </label>
        <OutputArea value={output} />
      </div>
    </div>
  );
};
