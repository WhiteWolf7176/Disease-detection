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
    <div className="w-full max-w-[90%] mx-auto py-16 px-4">
      
      <h1 className="text-5xl md:text-6xl font-extrabold text-center text-green-800 mb-12">
        Disease Care Guide
      </h1>
      
      {/* --- Filter Buttons --- */}
      <div className="flex flex-wrap justify-center gap-6 mb-16">
        {['all', 'arecanut', 'coconut'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-8 py-3 rounded-full text-xl font-bold capitalize transition transform hover:scale-105
              ${filter === type 
                ? 'bg-green-700 text-white shadow-lg' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
            `}
          >
            {type}
          </button>
        ))}
      </div>

      {/* --- Disease Card Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10">
        {filteredData.map(item => (
          <div key={item.id} className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition duration-300 border border-gray-100">
            {/* Taller images (h-64) */}
            <img 
              src={item.img} 
              alt={item.name} 
              className="w-full h-64 object-cover"
            />
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-3xl font-bold text-green-800 mb-4">{item.name}</h3>
              
              <div className="mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">About:</h4>
                <p className="text-lg text-gray-600 leading-relaxed">{item.about}</p>
              </div>
              
              <div className="mt-auto">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Treatment:</h4>
                <p className="text-lg text-gray-600 leading-relaxed">{item.treatment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarePage;
