import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import IdentifyPage from './pages/IdentifyPage.jsx'; // <-- This is the fix
import Team from './pages/Team.jsx';
// Import other pages you create, e.g., CarePage, AboutPage

function App() {
  return (
    <Routes>
      {/* This is the magic:
        The <Layout> component (Header/Footer) wraps all our pages.
      */}
      <Route path="/" element={<Layout />}>
        {/* The 'index' route is the default child, i.e., "/" */}
        <Route index element={<HomePage />} />
        
        {/* Other pages */}
        <Route path="identify" element={<IdentifyPage />} />
        <Route path="team" element={<Team />} />
        
        {/* TODO: Create these pages */}
        {/* <Route path="care" element={<CarePage />} /> */}
        {/* <Route path="about" element={<AboutPage />} /> */}
        {/* <Route path="documentation" element={<DocumentationPage />} /> */}

      </Route>
    </Routes>
  );
}

export default App;
