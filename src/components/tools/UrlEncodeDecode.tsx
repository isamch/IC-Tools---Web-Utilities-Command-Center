
import React, { useState } from 'react';
import { TextInput } from '../shared/TextInput';
import { OutputArea } from '../shared/OutputArea';
import { Button } from '../shared/Button';

export const UrlEncodeDecode: React.FC = () => {
  const [input, setInput] = useState('');
  const [encoded, setEncoded] = useState('');
  const [decoded, setDecoded] = useState('');

  const encode = () => {
    try {
      setEncoded(encodeURIComponent(input));
    } catch (error) {
      setEncoded('Error encoding text');
    }
  };

  const decode = () => {
    try {
      setDecoded(decodeURIComponent(input));
    } catch (error) {
      setDecoded('Error decoding text');
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
        <Button onClick={encode}>URL Encode</Button>
        <Button onClick={decode} variant="secondary">URL Decode</Button>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URL Encoded
        </label>
        <OutputArea value={encoded} rows={4} />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URL Decoded
        </label>
        <OutputArea value={decoded} rows={4} />
      </div>
    </div>
  );
};
