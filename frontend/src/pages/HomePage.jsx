import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    // Changed: Added 'min-h-[80vh]' to force it to take up most of the screen height
    // Changed: Added a subtle gradient background to make it feel less "empty"
    <div className="flex flex-col items-center justify-center text-center py-20 px-4 min-h-[85vh] bg-gradient-to-b from-white to-green-50">
      
      {/* 1. HERO SECTION */}
      <div className="max-w-4xl mx-auto">
        {/* Changed: Increased text from 5xl to 7xl for a bigger impact */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-green-800 mb-8 leading-tight">
          AI-Powered <br className="hidden md:block" />
          <span className="text-green-600">Disease Detection</span>
        </h1>
        
        {/* Changed: Increased text from xl to 2xl/3xl */}
        <p className="text-xl md:text-3xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Get instant, accurate diagnoses for your Arecanut and Coconut palms. 
          Just upload an image to get started.
        </p>
        
        {/* Changed: Made the button larger (py-4 px-10 -> py-5 px-12) and text larger */}
        <Link 
          to="/identify" 
          className="inline-block bg-green-600 text-white font-bold text-xl md:text-2xl px-12 py-5 rounded-xl shadow-xl hover:bg-green-700 hover:scale-105 transition transform duration-200"
        >
          Get Started
        </Link>
      </div>

      {/* 2. SUPPORTED PLANTS SECTION */}
      <div className="mt-24 w-full max-w-5xl">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-700 mb-10">Supported Plants</h3>
        
        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24 items-center">
            {/* Plant 1 */}
            <div className="group cursor-pointer">
                {/* Changed: Increased image size from w-40 (10rem) to w-64 (16rem) */}
                <div className="relative overflow-hidden rounded-full shadow-2xl w-56 h-56 md:w-72 md:h-72 border-4 border-white group-hover:border-green-400 transition-all duration-300">
                    <img 
                      src="/images/healthy-nut.jpg" 
                      alt="Arecanut" 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                </div>
                <p className="mt-6 text-2xl md:text-3xl font-bold text-gray-800 group-hover:text-green-700 transition">Arecanut</p>
            </div>

            {/* Plant 2 */}
            <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-full shadow-2xl w-56 h-56 md:w-72 md:h-72 border-4 border-white group-hover:border-green-400 transition-all duration-300">
                    {/* Make sure you have a coconut image in /public/images/ or use a placeholder */}
                     <img 
                      src="/images/coconut.jpeg" 
                      alt="Coconut" 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                </div>
                <p className="mt-6 text-2xl md:text-3xl font-bold text-gray-800 group-hover:text-green-700 transition">Coconut</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
