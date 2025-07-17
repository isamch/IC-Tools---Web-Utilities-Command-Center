
import React, { useState } from 'react';
import { Button } from '../shared/Button';
import { OutputArea } from '../shared/OutputArea';

export const LoremIpsum: React.FC = () => {
  const [output, setOutput] = useState('');
  const [paragraphs, setParagraphs] = useState(3);
  const [words, setWords] = useState(50);
  const [type, setType] = useState<'paragraphs' | 'words' | 'sentences'>('paragraphs');

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ];

  const generateWords = (count: number) => {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
    }
    return result;
  };

  const generateSentence = () => {
    const sentenceLength = Math.floor(Math.random() * 10) + 8;
    const words = generateWords(sentenceLength);
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ') + '.';
  };

  const generateParagraph = () => {
    const sentenceCount = Math.floor(Math.random() * 4) + 3;
    const sentences = [];
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence());
    }
    return sentences.join(' ');
  };

  const generate = () => {
    let result = '';
    
    if (type === 'paragraphs') {
      const paras = [];
      for (let i = 0; i < paragraphs; i++) {
        paras.push(generateParagraph());
      }
      result = paras.join('\n\n');
    } else if (type === 'words') {
      const wordList = generateWords(words);
      wordList[0] = wordList[0].charAt(0).toUpperCase() + wordList[0].slice(1);
      result = wordList.join(' ') + '.';
    } else if (type === 'sentences') {
      const sentences = [];
      for (let i = 0; i < paragraphs; i++) {
        sentences.push(generateSentence());
      }
      result = sentences.join(' ');
    }
    
    setOutput(result);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Generate Type
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="paragraphs"
              checked={type === 'paragraphs'}
              onChange={(e) => setType(e.target.value as any)}
              className="mr-2"
            />
            Paragraphs
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="words"
              checked={type === 'words'}
              onChange={(e) => setType(e.target.value as any)}
              className="mr-2"
            />
            Words
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="sentences"
              checked={type === 'sentences'}
              onChange={(e) => setType(e.target.value as any)}
              className="mr-2"
            />
            Sentences
          </label>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {type === 'words' ? 'Number of Words' : `Number of ${type}`}
        </label>
        <input
          type="number"
          value={type === 'words' ? words : paragraphs}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (type === 'words') {
              setWords(Math.max(1, Math.min(1000, value)));
            } else {
              setParagraphs(Math.max(1, Math.min(20, value)));
            }
          }}
          className="w-32 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          min="1"
          max={type === 'words' ? 1000 : 20}
        />
      </div>
      
      <Button onClick={generate}>Generate Lorem Ipsum</Button>
      
      {output && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Generated Text
          </label>
          <OutputArea value={output} rows={12} />
        </div>
      )}
    </div>
  );
};
