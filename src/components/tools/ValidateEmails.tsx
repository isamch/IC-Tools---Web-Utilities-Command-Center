
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { Button } from '../shared/Button';
import { Check, X } from 'lucide-react';

export const ValidateEmails: React.FC = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<Array<{ email: string; valid: boolean }>>([]);

  const validateEmails = () => {
    const emails = input.split('\n').filter(email => email.trim());
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    
    const validationResults = emails.map(email => {
      const trimmedEmail = email.trim();
      return { 
        email: trimmedEmail, 
        valid: emailRegex.test(trimmedEmail) 
      };
    });
    
    setResults(validationResults);
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
          placeholder="Enter email addresses to validate..."
        />
      </div>
      
      <Button onClick={validateEmails}>Validate Emails</Button>
      
      {results.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Validation Results
          </label>
          <div className="bg-white border border-gray-200 rounded-xl p-4 max-h-96 overflow-y-auto">
            <div className="space-y-2">
              {results.map((result, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                  result.valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <span className="break-all flex-1">{result.email}</span>
                  <div className="ml-3 flex items-center">
                    {result.valid ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <X size={16} className="text-red-600" />
                    )}
                    <span className={`ml-1 text-sm ${
                      result.valid ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {result.valid ? 'Valid' : 'Invalid'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
