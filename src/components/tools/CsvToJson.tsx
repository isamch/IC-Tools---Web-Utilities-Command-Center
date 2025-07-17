
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const CsvToJson: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [hasHeader, setHasHeader] = useState(true);

  const convertCsvToJson = () => {
    try {
      const lines = input.trim().split('\n');
      if (lines.length === 0) {
        setOutput('No data to convert');
        return;
      }

      const headers = hasHeader 
        ? lines[0].split(delimiter).map(h => h.trim())
        : lines[0].split(delimiter).map((_, i) => `column_${i + 1}`);
      
      const dataLines = hasHeader ? lines.slice(1) : lines;
      
      const jsonData = dataLines.map(line => {
        const values = line.split(delimiter).map(v => v.trim());
        const obj: { [key: string]: string } = {};
        headers.forEach((header, index) => {
          obj[header] = values[index] || '';
        });
        return obj;
      });

      setOutput(JSON.stringify(jsonData, null, 2));
    } catch (error) {
      setOutput('Error converting CSV to JSON');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          CSV Input
        </label>
        <TextInput
          value={input}
          onChange={setInput}
          placeholder="Enter CSV data..."
          rows={8}
        />
      </div>
      
      <div className="flex gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Delimiter
          </label>
          <input
            type="text"
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            className="w-20 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder=","
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hasHeader"
            checked={hasHeader}
            onChange={(e) => setHasHeader(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="hasHeader" className="text-sm text-gray-700">
            First row is header
          </label>
        </div>
      </div>
      
      <Button onClick={convertCsvToJson}>Convert to JSON</Button>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          JSON Output
        </label>
        <OutputArea value={output} rows={10} />
      </div>
    </div>
  );
};
