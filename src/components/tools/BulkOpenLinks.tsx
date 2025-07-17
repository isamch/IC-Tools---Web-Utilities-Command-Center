
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { Button } from '../shared/Button';
import { ExternalLink } from 'lucide-react';

export const BulkOpenLinks: React.FC = () => {
  const [input, setInput] = useState('');
  const [delay, setDelay] = useState(500);

  const openLinks = async () => {
    const links = input.split('\n').filter(link => link.trim());
    
    if (links.length === 0) return;
    
    if (links.length > 10) {
      const confirmed = window.confirm(
        `You're about to open ${links.length} links. This might be blocked by your browser. Continue?`
      );
      if (!confirmed) return;
    }
    
    for (let i = 0; i < links.length; i++) {
      const link = links[i].trim();
      if (link) {
        window.open(link, '_blank');
        if (i < links.length - 1) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800 text-sm">
          <strong>Note:</strong> Modern browsers may block multiple pop-ups. 
          You may need to allow pop-ups for this site to work properly.
        </p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URLs to Open (one per line)
        </label>
        <TextInput
          value={input}
          onChange={setInput}
          placeholder="Enter URLs, one per line..."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Delay between opens (ms)
        </label>
        <input
          type="number"
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          min="0"
          max="5000"
        />
      </div>
      
      <Button onClick={openLinks}>
        <ExternalLink size={16} className="mr-2" />
        Open All Links
      </Button>
    </div>
  );
};
