// App.js
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { CalendarPage } from './pages/CalendarPage';
import { ChallengePage } from './pages/ChallengePage';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navigation } from './components/Navigation';
import './styles/globals.css';

function AppContent() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Determine which page is active for highlighting nav items
  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="app">
      <Navigation 
        isActive={isActive} 
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        closeMobileMenu={closeMobileMenu}
      />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/challenge/:date" element={<ChallengePage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;