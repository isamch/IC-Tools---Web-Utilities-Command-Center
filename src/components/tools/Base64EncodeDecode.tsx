
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const Base64EncodeDecode: React.FC = () => {
  const [input, setInput] = useState('');
  const [encoded, setEncoded] = useState('');
  const [decoded, setDecoded] = useState('');

  const encode = () => {
    try {
      const encoded = btoa(input);
      setEncoded(encoded);
    } catch (error) {
      setEncoded('Error encoding text');
    }
  };

  const decode = () => {
    try {
      const decoded = atob(input);
      setDecoded(decoded);
    } catch (error) {
      setDecoded('Error decoding text - invalid Base64');
    }
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
          placeholder="Enter text to encode/decode..."
          rows={4}
        />
      </div>
      
      <div className="flex gap-4">
        <Button onClick={encode}>Base64 Encode</Button>
        <Button onClick={decode} variant="secondary">Base64 Decode</Button>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Base64 Encoded
        </label>
        <OutputArea value={encoded} rows={4} />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Base64 Decoded
        </label>
        <OutputArea value={decoded} rows={4} />
      </div>
    </div>
  );
};
