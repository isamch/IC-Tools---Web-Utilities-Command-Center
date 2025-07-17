
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const ConvertMarkdownLinks: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [linkText, setLinkText] = useState('Link');

  const convertToMarkdown = () => {
    const urls = input.split('\n').filter(url => url.trim());
    const markdownLinks = urls.map(url => {
      const trimmedUrl = url.trim();
      return `[${linkText}](${trimmedUrl})`;
    });
    setOutput(markdownLinks.join('\n'));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URLs (one per line)
        </label>
        <TextInput
          value={input}
          onChange={setInput}
          placeholder="Enter URLs to convert to markdown..."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Link Text
        </label>
        <input
          type="text"
          value={linkText}
          onChange={(e) => setLinkText(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Default link text"
        />
      </div>
      
      <Button onClick={convertToMarkdown}>Convert to Markdown</Button>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Markdown Links
        </label>
        <OutputArea value={output} />
      </div>
    </div>
  );
};
