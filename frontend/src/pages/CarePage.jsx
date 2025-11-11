import React, { useState } from 'react';
import { CARE_DATA } from '../CareData'; // Import our new data

function CarePage() {
  // State to manage the filter ('all', 'arecanut', 'coconut')
  const [filter, setFilter] = useState('all');

  // Filter the data based on the current state
  const filteredData = CARE_DATA.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
        Disease Care Guide
      </h1>
      
      {/* --- Filter Buttons --- */}
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-full font-semibold transition
            ${filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}
          `}
        >
          All
        </button>
        <button
          onClick={() => setFilter('arecanut')}
          className={`px-6 py-2 rounded-full font-semibold transition
            ${filter === 'arecanut' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}
          `}
        >
          Arecanut
        </button>
        <button
          onClick={() => setFilter('coconut')}
          className={`px-6 py-2 rounded-full font-semibold transition
            ${filter === 'coconut' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}
          `}
        >
          Coconut
        </button>
      </div>

      {/* --- Disease Card Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredData.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
            <img 
              src={item.img} 
              alt={item.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-green-700 mb-3">{item.name}</h3>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-1">About this Disease:</h4>
                <p className="text-gray-600 text-sm">{item.about}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Prevention & Treatment:</h4>
                <p className="text-gray-600 text-sm">{item.treatment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarePage;
