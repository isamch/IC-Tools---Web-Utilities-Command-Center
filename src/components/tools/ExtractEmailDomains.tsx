
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const ExtractEmailDomains: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const extractEmailDomains = () => {
    const emails = input.split('\n').filter(email => email.trim());
    const domains = emails.map(email => {
      const trimmedEmail = email.trim();
      const atIndex = trimmedEmail.lastIndexOf('@');
      if (atIndex !== -1 && atIndex < trimmedEmail.length - 1) {
        return trimmedEmail.substring(atIndex + 1);
      }
      return null;
    }).filter(domain => domain !== null);
    
    const uniqueDomains = [...new Set(domains)];
    setOutput(uniqueDomains.join('\n'));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Addresses (one per line)
        </label>
        <TextInput
          value={input}
          onChange={setInput}
          placeholder="Enter email addresses to extract domains from..."
        />
      </div>
      
      <Button onClick={extractEmailDomains}>Extract Domains</Button>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Domains
        </label>
        <OutputArea value={output} />
      </div>
    </div>
  );
};
