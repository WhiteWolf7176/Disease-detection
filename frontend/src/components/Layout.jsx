import React from 'react';
import { Link, Outlet } from 'react-router-dom';

// This is our main layout component
function Layout() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans flex flex-col">
      {/* Top Header */}
      <header className="bg-gradient-to-r from-green-100 to-green-300 py-6 shadow-md sticky top-0 z-50">
        <div className="w-full max-w-[95%] mx-auto flex justify-between items-center px-4">
          
          <Link to="/" className="text-2xl md:text-3xl font-extrabold text-green-900 tracking-tight flex items-center gap-2">
            <span>🌿</span> Plant Disease Classifier
          </Link>

          <nav className="space-x-8 font-semibold text-lg md:text-xl">
            <Link to="/" className="hover:text-green-800 transition">Home</Link>
            <Link to="/identify" className="hover:text-green-800 transition">Identify</Link>
            <Link to="/care" className="hover:text-green-800 transition">Care</Link>
            <Link to="/team" className="hover:text-green-800 transition">About</Link>
          </nav>
        </div>
      </header>

  
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-gray-100 py-8 text-center text-gray-700">
        <div className="space-x-6 text-lg mb-4">
          <Link to="/documentation" className="text-blue-600 hover:underline">Documentation</Link>
          <Link to="/team" className="text-blue-600 hover:underline">Meet Our Team</Link>
        </div>
        <p className="text-md">&copy; 2025 Plant-Disease-Classifier | Built by CSE GMIT</p>
      </footer>
    </div>
  );
}

export default Layout;
