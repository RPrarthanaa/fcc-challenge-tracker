// pages/CalendarPage.js
import React, { useState } from 'react';
import { Calendar } from '../components/Calendar';
import { ChallengeDetails } from '../components/ChallengeDetails';
import { CalendarSummary } from '../components/CalendarSummary';

// Mock data for challenge days
const mockChallengeDays = {
  '2026-06-01': { status: 'completed', title: 'Responsive Web Design', filesCount: 3 },
  '2026-06-02': { status: 'completed', title: 'Basic CSS', filesCount: 2 },
  '2026-06-03': { status: 'in-progress', title: 'JavaScript Algorithms', filesCount: 1 },
  '2026-06-05': { status: 'missed', title: null, filesCount: 0 },
  '2026-06-06': { status: 'completed', title: 'Front End Libraries', filesCount: 4 },
  '2026-06-07': { status: 'in-progress', title: 'Data Visualization', filesCount: 2 },
  '2026-06-08': { status: 'completed', title: 'APIs and Microservices', filesCount: 3 },
};

export const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Current month

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleCloseDetails = () => {
    setSelectedDate(null);
  };

  const handleMonthChange = (newDate) => {
    setCurrentMonth(newDate);
    setSelectedDate(null);
  };

  return (
    <div className="calendar-page">
      <div className="page-header">
        <div>
          <h1>Daily Challenges Calendar</h1>
          <p className="page-subtitle">Track challenge completion and maintain your coding streak.</p>
        </div>
      </div>

      <div className="calendar-container">
        <div className="calendar-main">
          <Calendar
            currentMonth={currentMonth}
            onMonthChange={handleMonthChange}
            onDateSelect={handleDateSelect}
            challengeData={mockChallengeDays}
            selectedDate={selectedDate}
          />
          <CalendarSummary challengeData={mockChallengeDays} currentMonth={currentMonth} />
        </div>
        
        {selectedDate && (
          <ChallengeDetails
            date={selectedDate}
            data={mockChallengeDays[selectedDate.toISOString().split('T')[0]]}
            onClose={handleCloseDetails}
          />
        )}
      </div>
    </div>
  );
};