import React from 'react';
import { Link, Outlet } from 'react-router-dom';

// This is our main layout component
function Layout() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Top Header (Copied from your App.js) */}
      <header className="bg-gradient-to-r from-green-100 to-green-300 py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
          <Link to="/" className="text-xl font-bold text-green-800">
            🌿 Plant Disease Classifier
          </Link>
          <nav className="space-x-6 font-medium">
            {/* KEY CHANGE: 
              We are using <Link> from react-router-dom instead of <a href="">.
              This prevents the page from reloading.
            */}
            <Link to="/" className="hover:text-green-700">Home</Link>
            <Link to="/identify" className="hover:text-green-700">Identify</Link>
            <Link to="/care" className="hover:text-green-700">Care</Link>
            <Link to="/about" className="hover:text-green-700">About</Link>
          </nav>
        </div>
      </header>

      {/* This <Outlet /> is the magic part. 
        It renders whichever child route is active.
      */}
      <main>
        <Outlet />
      </main>

      {/* Footer (Copied from your App.js) */}
      <footer className="mt-16 bg-gray-100 py-6 text-center text-sm text-gray-700">
        <div className="space-x-4">
          <Link to="/documentation" className="text-blue-600 underline">Documentation</Link>
          <Link to="/team" className="text-blue-600 underline">Meet Our Team</Link>
        </div>
        <p className="mt-2">&copy; 2025 Plant-Disease-Classifier | Built by CSE GMIT</p>
      </footer>
    </div>
  );
}

export default Layout;
