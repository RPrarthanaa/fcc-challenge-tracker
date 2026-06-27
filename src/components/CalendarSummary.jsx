// components/CalendarSummary.js
import React from 'react';

export const CalendarSummary = ({ challengeData, currentMonth }) => {
  const monthKey = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;
  
  const monthData = Object.entries(challengeData).filter(([key]) => key.startsWith(monthKey));
  
  const total = monthData.length;
  const completed = monthData.filter(([_, data]) => data.status === 'completed').length;
  const inProgress = monthData.filter(([_, data]) => data.status === 'in-progress').length;
  const missed = monthData.filter(([_, data]) => data.status === 'missed').length;
  
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="calendar-summary">
      <h3>Monthly Summary</h3>
      <div className="summary-grid">
        <div className="summary-item">
          <span className="label">Completed</span>
          <span className="value">{completed}</span>
        </div>
        <div className="summary-item">
          <span className="label">In Progress</span>
          <span className="value">{inProgress}</span>
        </div>
        <div className="summary-item">
          <span className="label">Missed</span>
          <span className="value">{missed}</span>
        </div>
        <div className="summary-item">
          <span className="label">Completion Rate</span>
          <span className="value">{completionRate}%</span>
        </div>
      </div>
    </div>
  );
};