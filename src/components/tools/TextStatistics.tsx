
import React, { useState, useMemo } from 'react';
import { TextInput } from '../shared/TextInput';

export const TextStatistics: React.FC = () => {
  const [input, setInput] = useState('');

  const statistics = useMemo(() => {
    const characters = input.length;
    const charactersNoSpaces = input.replace(/\s/g, '').length;
    const words = input.trim() ? input.trim().split(/\s+/).length : 0;
    const sentences = input.trim() ? input.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    const paragraphs = input.trim() ? input.split(/\n\s*\n/).filter(p => p.trim()).length : 0;
    const lines = input ? input.split('\n').length : 0;
    
    const wordList = input.trim() ? input.trim().split(/\s+/) : [];
    const longestWord = wordList.reduce((longest, word) => 
      word.length > longest.length ? word : longest, ''
    );
    
    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      longestWord,
    };
  }, [input]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Input Text
        </label>
        <TextInput
          value={input}
          onChange={setInput}
          placeholder="Enter text to analyze..."
          rows={10}
        />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
          <div className="text-2xl font-bold text-blue-600">{statistics.characters}</div>
          <div className="text-sm text-blue-800">Characters</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
          <div className="text-2xl font-bold text-purple-600">{statistics.charactersNoSpaces}</div>
          <div className="text-sm text-purple-800">Characters (no spaces)</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
          <div className="text-2xl font-bold text-green-600">{statistics.words}</div>
          <div className="text-sm text-green-800">Words</div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
          <div className="text-2xl font-bold text-orange-600">{statistics.sentences}</div>
          <div className="text-sm text-orange-800">Sentences</div>
        </div>
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl">
          <div className="text-2xl font-bold text-pink-600">{statistics.paragraphs}</div>
          <div className="text-sm text-pink-800">Paragraphs</div>
        </div>
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl">
          <div className="text-2xl font-bold text-indigo-600">{statistics.lines}</div>
          <div className="text-sm text-indigo-800">Lines</div>
        </div>
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-xl col-span-2">
          <div className="text-lg font-bold text-teal-600 break-all">{statistics.longestWord || 'N/A'}</div>
          <div className="text-sm text-teal-800">Longest Word</div>
        </div>
      </div>
    </div>
  );
};
