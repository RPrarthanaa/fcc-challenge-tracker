// components/StatCard.js
import React from 'react';

const colorStyles = {
  primary: { bg: 'rgba(99, 102, 241, 0.1)', iconBg: '#6366f1' },
  blue: { bg: 'rgba(59, 130, 246, 0.1)', iconBg: '#3b82f6' },
  purple: { bg: 'rgba(139, 92, 246, 0.1)', iconBg: '#8b5cf6' },
  orange: { bg: 'rgba(249, 115, 22, 0.1)', iconBg: '#f97316' },
  green: { bg: 'rgba(34, 197, 94, 0.1)', iconBg: '#22c55e' },
  teal: { bg: 'rgba(20, 184, 166, 0.1)', iconBg: '#14b8a6' },
};

export const StatCard = ({ title, value, icon, suffix = '', trend, color = 'primary' }) => {
  const colors = colorStyles[color];

  return (
    <div className="stat-card" style={{ '--hover-color': colors.iconBg }}>
      <div className="stat-card-header">
        <div className="stat-icon" style={{ backgroundColor: colors.bg, color: colors.iconBg }}>
          {icon}
        </div>
      </div>
      <div className="stat-card-content">
        <p className="stat-title">{title}</p>
        <p className="stat-value">
          {value}{suffix && <span className="stat-suffix">{suffix}</span>}
        </p>
        {trend && <p className="stat-trend">{trend}</p>}
      </div>
    </div>
  );
};