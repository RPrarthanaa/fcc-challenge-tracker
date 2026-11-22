// components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Calendar, Sun, Moon, Menu, X, Code2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const Navigation = ({ isActive, mobileMenuOpen, toggleMobileMenu, closeMobileMenu }) => {
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/calendar', label: 'Calendar', icon: <Calendar size={18} /> },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
          <Code2 size={28} />
          <span>FCC Challenge Tracker</span>
        </Link>

        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Menu">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};