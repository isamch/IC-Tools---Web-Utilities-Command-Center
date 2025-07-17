
import React, { useState } from 'react';
import { Button } from '../shared/Button';
import { RefreshCw } from 'lucide-react';

interface FakeData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  company: string;
}

export const FakeDataGenerator: React.FC = () => {
  const [data, setData] = useState<FakeData[]>([]);
  const [count, setCount] = useState(5);

  const firstNames = [
    'John', 'Jane', 'Michael', 'Sarah', 'David', 'Lisa', 'Robert', 'Emily',
    'James', 'Anna', 'William', 'Jessica', 'Richard', 'Ashley', 'Joseph'
  ];

  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
    'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez'
  ];

  const cities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
    'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville'
  ];

  const states = [
    'NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'FL', 'OH', 'NC', 'GA', 'MI', 'NJ'
  ];

  const streets = [
    'Main St', 'Oak Ave', 'Pine Rd', 'Cedar Ln', 'Elm Dr', 'Maple Way',
    'Park Blvd', 'First St', 'Second Ave', 'Third Rd', 'Washington St'
  ];

  const companies = [
    'Tech Solutions Inc', 'Global Services LLC', 'Innovation Corp', 'Digital Works',
    'Future Systems', 'Creative Agency', 'Business Solutions', 'Advanced Tech'
  ];

  const generateFakeData = (): FakeData => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const streetNumber = Math.floor(Math.random() * 9999) + 1;
    const street = streets[Math.floor(Math.random() * streets.length)];
    
    return {
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      address: `${streetNumber} ${street}`,
      city: cities[Math.floor(Math.random() * cities.length)],
      state: states[Math.floor(Math.random() * states.length)],
      zipCode: String(Math.floor(Math.random() * 90000) + 10000),
      company: companies[Math.floor(Math.random() * companies.length)]
    };
  };

  const generate = () => {
    const newData = Array.from({ length: count }, () => generateFakeData());
    setData(newData);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Records
        </label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value))))}
          className="w-32 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          min="1"
          max="50"
        />
      </div>
      
      <Button onClick={generate}>
        <RefreshCw size={16} className="mr-2" />
        Generate Fake Data
      </Button>
      
      {data.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Generated Data ({data.length} records)
          </label>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto max-h-96">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="text-left p-3 font-medium text-gray-700">Name</th>
                    <th className="text-left p-3 font-medium text-gray-700">Email</th>
                    <th className="text-left p-3 font-medium text-gray-700">Phone</th>
                    <th className="text-left p-3 font-medium text-gray-700">Address</th>
                    <th className="text-left p-3 font-medium text-gray-700">City</th>
                    <th className="text-left p-3 font-medium text-gray-700">State</th>
                    <th className="text-left p-3 font-medium text-gray-700">ZIP</th>
                    <th className="text-left p-3 font-medium text-gray-700">Company</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((record, index) => (
                    <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="p-3">{record.name}</td>
                      <td className="p-3">{record.email}</td>
                      <td className="p-3">{record.phone}</td>
                      <td className="p-3">{record.address}</td>
                      <td className="p-3">{record.city}</td>
                      <td className="p-3">{record.state}</td>
                      <td className="p-3">{record.zipCode}</td>
                      <td className="p-3">{record.company}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
