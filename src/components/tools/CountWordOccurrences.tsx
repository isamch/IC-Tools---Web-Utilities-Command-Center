
import React, { useState, useMemo } from 'react';
import { TextInput } from '../shared/TextInput';

export const CountWordOccurrences: React.FC = () => {
  const [input, setInput] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);

  const wordCounts = useMemo(() => {
    if (!input.trim()) return [];
    
    const words = input.trim().split(/\s+/);
    const counts: { [key: string]: number } = {};
    
    words.forEach(word => {
      const key = caseSensitive ? word : word.toLowerCase();
      counts[key] = (counts[key] || 0) + 1;
    });
    
    return Object.entries(counts)
      .sort(([,a], [,b]) => b - a)
      .map(([word, count]) => ({ word, count }));
  }, [input, caseSensitive]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Input Text
        </label>
        <TextInput
          value={input}
          onChange={setInput}
          placeholder="Enter text to count word occurrences..."
        />
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="caseSensitive"
          checked={caseSensitive}
          onChange={(e) => setCaseSensitive(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="caseSensitive" className="text-sm text-gray-700">
          Case sensitive
        </label>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Word Occurrences
        </label>
        <div className="bg-white border border-gray-200 rounded-xl p-4 max-h-96 overflow-y-auto">
          {wordCounts.length > 0 ? (
            <div className="space-y-2">
              {wordCounts.map(({ word, count }, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="font-medium">{word}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No words to count</p>
          )}
        </div>
      </div>
    </div>
  );
};
