
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { Button } from '../shared/Button';

export const HighlightKeyword: React.FC = () => {
  const [input, setInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);

  const getHighlightedText = () => {
    if (!keyword) return input;
    
    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, flags);
    
    return input.split(regex).map((part, index) => {
      const isMatch = caseSensitive 
        ? part === keyword 
        : part.toLowerCase() === keyword.toLowerCase();
        
      return isMatch ? (
        <mark key={index} className="bg-yellow-300 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      );
    });
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
          placeholder="Enter text to search in..."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Keyword to Highlight
        </label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter keyword to highlight"
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
          Highlighted Text
        </label>
        <div className="w-full p-4 border border-gray-200 rounded-xl bg-white min-h-[200px] whitespace-pre-wrap">
          {getHighlightedText()}
        </div>
      </div>
    </div>
  );
};
