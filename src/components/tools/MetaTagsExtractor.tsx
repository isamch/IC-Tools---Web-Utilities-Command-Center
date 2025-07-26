
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';

export const MetaTagsExtractor: React.FC = () => {
  const [input, setInput] = useState('');
  const [metaTags, setMetaTags] = useState<Array<{ name?: string; property?: string; content: string; httpEquiv?: string }>>([]);

  const extractMetaTags = () => {
    const metaRegex = /<meta\s+([^>]*?)>/gi;
    const matches = [];
    let match;
    
    while ((match = metaRegex.exec(input)) !== null) {
      const attributes = match[1];
      const tag: any = {};
      
      // Extract name attribute
      const nameMatch = attributes.match(/name\s*=\s*["']([^"']*)["']/i);
      if (nameMatch) tag.name = nameMatch[1];

      const propertyMatch = attributes.match(/property\s*=\s*["']([^"']*)["']/i);
      if (propertyMatch) tag.property = propertyMatch[1];

      const httpEquivMatch = attributes.match(/http-equiv\s*=\s*["']([^"']*)["']/i);
      if (httpEquivMatch) tag.httpEquiv = httpEquivMatch[1];

      const contentMatch = attributes.match(/content\s*=\s*["']([^"']*)["']/i);
      if (contentMatch) tag.content = contentMatch[1];

      if (tag.name || tag.property || tag.httpEquiv) {
        matches.push(tag);
      }
    }
    
    setMetaTags(matches);
  };

  React.useEffect(() => {
    if (input.trim()) {
      extractMetaTags();
    } else {
      setMetaTags([]);
    }
  }, [input]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          HTML Content
        </label>
        <TextInput
          value={input}
          onChange={setInput}
          placeholder="Paste HTML content containing meta tags..."
          rows={8}
        />
      </div>
      
      {metaTags.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Extracted Meta Tags ({metaTags.length})
          </label>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-700">Type</th>
                    <th className="text-left p-4 font-medium text-gray-700">Attribute</th>
                    <th className="text-left p-4 font-medium text-gray-700">Content</th>
                  </tr>
                </thead>
                <tbody>
                  {metaTags.map((tag, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="p-4 text-sm font-mono bg-blue-50">
                        {tag.name ? 'name' : tag.property ? 'property' : 'http-equiv'}
                      </td>
                      <td className="p-4 text-sm font-mono">
                        {tag.name || tag.property || tag.httpEquiv}
                      </td>
                      <td className="p-4 text-sm break-all">{tag.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {input && metaTags.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No meta tags found in the provided HTML
        </div>
      )}
    </div>
  );
};
