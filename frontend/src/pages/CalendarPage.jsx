// pages/CalendarPage.js
import React, { useState, useEffect } from 'react';
import { Calendar } from '../components/Calendar';
import { ChallengeDetails } from '../components/ChallengeDetails';
import { CalendarSummary } from '../components/CalendarSummary';
import { calendarApi } from '../api/calendar';

export const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Current month
  const [challenges, setChallenges] = useState({}); // Store challenges data

  const fetchMonthData = async (month) => {
    try {
      const response = await calendarApi.getByMonth(month);
      if (response.data.success) {
        setChallenges(response.data.challenges);
        console.log("Fetched month data:", response.data.challenges);
      }
    } catch (error) {
      console.error("Error fetching month data:", error);
    }
  };

  useEffect(() => {
    fetchMonthData(String(currentMonth.getMonth()+1).padStart(2, '0'));
  }, [currentMonth]);

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
            challengeData={challenges}
            selectedDate={selectedDate}
          />
          <CalendarSummary challengeData={challenges} currentMonth={currentMonth} />
        </div>
        
        {selectedDate && (
          <ChallengeDetails
            date={selectedDate}
            data={challenges[`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`]}
            onClose={handleCloseDetails}
          />
        )}
      </div>
    </div>
  );
};