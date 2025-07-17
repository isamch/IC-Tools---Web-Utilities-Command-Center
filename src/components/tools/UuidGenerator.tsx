
import React, { useState } from 'react';
import { Button } from '../shared/Button';
import { OutputArea } from '../shared/OutputArea';
import { RefreshCw } from 'lucide-react';

export const UuidGenerator: React.FC = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);

  const generateUuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const generateUuids = () => {
    const newUuids = Array.from({ length: count }, () => generateUuid());
    setUuids(newUuids);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of UUIDs to Generate
        </label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
          className="w-32 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          min="1"
          max="100"
        />
      </div>
      
      <Button onClick={generateUuids}>
        <RefreshCw size={16} className="mr-2" />
        Generate UUIDs
      </Button>
      
      {uuids.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Generated UUIDs
          </label>
          <OutputArea value={uuids.join('\n')} rows={Math.min(uuids.length + 2, 10)} />
        </div>
      )}
    </div>
  );
};
