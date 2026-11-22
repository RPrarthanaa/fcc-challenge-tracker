// components/CalendarSummary.js
import React from 'react';

export const CalendarSummary = ({ challengeData, currentMonth }) => {
  const totalDaysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth()+1,0).getDate();
  const today = new Date();
  
  const completed = Object.values(challengeData).filter(challenge => challenge.Status === "Completed").length;
  const inProgress = Object.values(challengeData).filter(challenge => challenge.Status === "In Progress").length;
  
  let missed = 0;
  let completionRate = 0;

  const currentMonthIndex = currentMonth.getFullYear()*12 + currentMonth.getMonth();
  const todayIndex = today.getFullYear()*12 + today.getMonth();

  if (currentMonthIndex == todayIndex) { // current month
    missed = today.getDate() - completed - inProgress - 1;
    completionRate = (completed / today.getDate()) * 100;
  } else if (currentMonthIndex < todayIndex) { // previous month
    missed = totalDaysInMonth - completed - inProgress;
    completionRate = (completed / totalDaysInMonth) * 100;
  }

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
          <span className="value">{completionRate.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
};