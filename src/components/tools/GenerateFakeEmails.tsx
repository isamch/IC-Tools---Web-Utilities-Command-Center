
import React, { useState } from 'react';
import { Button } from '../shared/Button';
import { OutputArea } from '../shared/OutputArea';
import { RefreshCw } from 'lucide-react';

export const GenerateFakeEmails: React.FC = () => {
  const [output, setOutput] = useState('');
  const [count, setCount] = useState(10);
  const [domain, setDomain] = useState('example.com');

  const firstNames = [
    'john', 'jane', 'mike', 'sarah', 'david', 'lisa', 'robert', 'emily',
    'james', 'anna', 'michael', 'jessica', 'william', 'ashley', 'richard'
  ];

  const lastNames = [
    'smith', 'johnson', 'williams', 'brown', 'jones', 'garcia', 'miller',
    'davis', 'rodriguez', 'martinez', 'hernandez', 'lopez', 'gonzalez'
  ];

  const generateFakeEmails = () => {
    const emails = [];
    
    for (let i = 0; i < count; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const number = Math.floor(Math.random() * 999) + 1;
      
      const patterns = [
        `${firstName}.${lastName}@${domain}`,
        `${firstName}${lastName}@${domain}`,
        `${firstName}${number}@${domain}`,
        `${firstName}.${lastName}${number}@${domain}`,
        `${firstName[0]}${lastName}@${domain}`
      ];
      
      const email = patterns[Math.floor(Math.random() * patterns.length)];
      emails.push(email);
    }
    
    setOutput(emails.join('\n'));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Emails
          </label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
            max="100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Domain
          </label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="example.com"
          />
        </div>
      </div>
      
      <Button onClick={generateFakeEmails}>
        <RefreshCw size={16} className="mr-2" />
        Generate Fake Emails
      </Button>
      
      {output && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Generated Emails
          </label>
          <OutputArea value={output} rows={Math.min(count + 2, 10)} />
        </div>
      )}
    </div>
  );
};
