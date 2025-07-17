
import React, { useState } from 'react';
import { Button } from '../shared/Button';
import { OutputArea } from '../shared/OutputArea';
import { RefreshCw } from 'lucide-react';

export const PasswordGenerator: React.FC = () => {
  const [passwords, setPasswords] = useState<string[]>([]);
  const [length, setLength] = useState(16);
  const [count, setCount] = useState(5);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: false
  });

  const generatePassword = () => {
    let charset = '';
    if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) charset += '0123456789';
    if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (options.excludeSimilar) {
      charset = charset.replace(/[0O1lI]/g, '');
    }
    
    if (!charset) {
      setPasswords(['Please select at least one character type']);
      return;
    }
    
    const newPasswords = [];
    for (let i = 0; i < count; i++) {
      let password = '';
      for (let j = 0; j < length; j++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      newPasswords.push(password);
    }
    
    setPasswords(newPasswords);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password Length
          </label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Math.max(4, Math.min(100, Number(e.target.value))))}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="4"
            max="100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Passwords
          </label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(20, Number(e.target.value))))}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
            max="20"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Character Types
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.uppercase}
              onChange={(e) => setOptions({...options, uppercase: e.target.checked})}
              className="mr-2"
            />
            Uppercase (A-Z)
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.lowercase}
              onChange={(e) => setOptions({...options, lowercase: e.target.checked})}
              className="mr-2"
            />
            Lowercase (a-z)
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.numbers}
              onChange={(e) => setOptions({...options, numbers: e.target.checked})}
              className="mr-2"
            />
            Numbers (0-9)
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.symbols}
              onChange={(e) => setOptions({...options, symbols: e.target.checked})}
              className="mr-2"
            />
            Symbols (!@#$...)
          </label>
        </div>
        <div className="mt-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.excludeSimilar}
              onChange={(e) => setOptions({...options, excludeSimilar: e.target.checked})}
              className="mr-2"
            />
            Exclude similar characters (0, O, 1, l, I)
          </label>
        </div>
      </div>
      
      <Button onClick={generatePassword}>
        <RefreshCw size={16} className="mr-2" />
        Generate Passwords
      </Button>
      
      {passwords.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Generated Passwords
          </label>
          <OutputArea value={passwords.join('\n')} rows={Math.min(passwords.length + 2, 10)} />
        </div>
      )}
    </div>
  );
};
