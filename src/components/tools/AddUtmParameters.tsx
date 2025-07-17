
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const AddUtmParameters: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');
  const [utmTerm, setUtmTerm] = useState('');
  const [utmContent, setUtmContent] = useState('');

  const addUtmParameters = () => {
    const urls = input.split('\n').filter(url => url.trim());
    const urlsWithUtm = urls.map(url => {
      try {
        const urlObj = new URL(url.trim());
        
        if (utmSource) urlObj.searchParams.set('utm_source', utmSource);
        if (utmMedium) urlObj.searchParams.set('utm_medium', utmMedium);
        if (utmCampaign) urlObj.searchParams.set('utm_campaign', utmCampaign);
        if (utmTerm) urlObj.searchParams.set('utm_term', utmTerm);
        if (utmContent) urlObj.searchParams.set('utm_content', utmContent);
        
        return urlObj.toString();
      } catch {
        return url; // Return original if not a valid URL
      }
    });
    setOutput(urlsWithUtm.join('\n'));
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
          placeholder="Enter URLs to add UTM parameters to..."
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            UTM Source
          </label>
          <input
            type="text"
            value={utmSource}
            onChange={(e) => setUtmSource(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., google"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            UTM Medium
          </label>
          <input
            type="text"
            value={utmMedium}
            onChange={(e) => setUtmMedium(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., cpc"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            UTM Campaign
          </label>
          <input
            type="text"
            value={utmCampaign}
            onChange={(e) => setUtmCampaign(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., spring_sale"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            UTM Term
          </label>
          <input
            type="text"
            value={utmTerm}
            onChange={(e) => setUtmTerm(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., running+shoes"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            UTM Content
          </label>
          <input
            type="text"
            value={utmContent}
            onChange={(e) => setUtmContent(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., logolink"
          />
        </div>
      </div>
      
      <Button onClick={addUtmParameters}>Add UTM Parameters</Button>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URLs with UTM Parameters
        </label>
        <OutputArea value={output} />
      </div>
    </div>
  );
};
