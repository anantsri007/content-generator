import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import IdeaGenerator from './components/IdeaGenerator';
import AnalyticsDashboard from './components/AnalyticsDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <nav className="nav">
        <Link to="/" className="nav-link">Idea Generator</Link>
        <Link to="/analytics" className="nav-link">Analytics Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<IdeaGenerator />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}




