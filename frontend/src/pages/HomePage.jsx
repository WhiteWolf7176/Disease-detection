import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-6">
      <h1 className="text-5xl font-bold text-green-800 mb-6">
        AI-Powered Disease Detection
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl">
        Get instant, accurate diagnoses for your Arecanut and Coconut palms. 
        Just upload an image to get started.
      </p>
      
      {/* This button links to your identify page */}
      <Link 
        to="/identify" 
        className="bg-green-600 text-white font-bold text-lg px-10 py-4 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
      >
        Get Started
      </Link>

      {/* You can re-add your example images here if you like! */}
      <div className="mt-20">
        <h3 className="text-2xl font-semibold mb-6">Supported Plants</h3>
        <div className="flex justify-center gap-10">
            <div className="text-center">
                <img src="/images/healthy-nut.jpg" alt="Arecanut" className="w-40 h-40 object-cover rounded-full shadow-md"/>
                <p className="mt-4 text-lg font-medium">Arecanut</p>
            </div>
            <div className="text-center">
                {/* Add a coconut image to your /public/images folder */}
                <img src="/images/coconut.jpeg" alt="Coconut" className="w-40 h-40 object-cover rounded-full shadow-md"/>
                <p className="mt-4 text-lg font-medium">Coconut</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
