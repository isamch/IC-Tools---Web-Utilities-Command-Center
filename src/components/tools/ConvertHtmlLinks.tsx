
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const ConvertHtmlLinks: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [linkText, setLinkText] = useState('Link');
  const [target, setTarget] = useState('_blank');

  const convertToHtml = () => {
    const urls = input.split('\n').filter(url => url.trim());
    const htmlLinks = urls.map(url => {
      const trimmedUrl = url.trim();
      const targetAttr = target ? ` target="${target}"` : '';
      return `<a href="${trimmedUrl}"${targetAttr}>${linkText}</a>`;
    });
    setOutput(htmlLinks.join('\n'));
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
          placeholder="Enter URLs to convert to HTML..."
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target
          </label>
          <select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">None</option>
            <option value="_blank">_blank (new tab)</option>
            <option value="_self">_self (same tab)</option>
            <option value="_parent">_parent</option>
            <option value="_top">_top</option>
          </select>
        </div>
      </div>
      
      <Button onClick={convertToHtml}>Convert to HTML</Button>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          HTML Links
        </label>
        <OutputArea value={output} />
      </div>
    </div>
  );
};
