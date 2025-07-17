
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { Button } from '../shared/Button';
import { Check, X } from 'lucide-react';

export const ValidateUrls: React.FC = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<Array<{ url: string; valid: boolean }>>([]);

  const validateUrls = () => {
    const urls = input.split('\n').filter(url => url.trim());
    const validationResults = urls.map(url => {
      try {
        new URL(url.trim());
        return { url: url.trim(), valid: true };
      } catch {
        return { url: url.trim(), valid: false };
      }
    });
    setResults(validationResults);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URLs to Validate (one per line)
        </label>
        <TextInput
          value={input}
          onChange={setInput}
          placeholder="Enter URLs to validate..."
        />
      </div>
      
      <Button onClick={validateUrls}>Validate URLs</Button>
      
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
                  <span className="break-all flex-1">{result.url}</span>
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
