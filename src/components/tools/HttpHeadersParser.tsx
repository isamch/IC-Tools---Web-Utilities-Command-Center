
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';

export const HttpHeadersParser: React.FC = () => {
  const [input, setInput] = useState('');
  const [parsedHeaders, setParsedHeaders] = useState<Array<{ name: string; value: string }>>([]);

  const parseHeaders = () => {
    const lines = input.split('\n').filter(line => line.trim());
    const headers = lines.map(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) {
        return { name: line.trim(), value: '' };
      }
      return {
        name: line.substring(0, colonIndex).trim(),
        value: line.substring(colonIndex + 1).trim()
      };
    }).filter(header => header.name);
    
    setParsedHeaders(headers);
  };

  React.useEffect(() => {
    if (input.trim()) {
      parseHeaders();
    } else {
      setParsedHeaders([]);
    }
  }, [input]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          HTTP Headers (raw format)
        </label>
        <TextInput
          value={input}
          onChange={setInput}
          placeholder="Enter HTTP headers (e.g., Content-Type: application/json)"
          rows={8}
        />
      </div>
      
      {parsedHeaders.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Parsed Headers
          </label>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-700">Header Name</th>
                    <th className="text-left p-4 font-medium text-gray-700">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {parsedHeaders.map((header, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="p-4 font-mono text-sm bg-blue-50">{header.name}</td>
                      <td className="p-4 text-sm break-all">{header.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
