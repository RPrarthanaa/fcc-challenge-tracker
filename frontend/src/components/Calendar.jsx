// components/Calendar.js
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const getStatusClass = (status, isCurrentDay, isSelected) => {
  if (isSelected) return 'calendar-day selected';
  if (isCurrentDay) return 'calendar-day current';
  if (!status) return 'calendar-day';
  switch (status) {
    case 'Completed': return 'calendar-day completed';
    case 'In Progress': return 'calendar-day in-progress';
    case 'Missed': return 'calendar-day missed';
    default: return 'calendar-day';
  }
};

const getStatusIndicator = (status) => {
  if (!status) return null;
  switch (status) {
    case 'Completed': return <div className="status-indicator completed" title="Completed" />;
    case 'In Progress': return <div className="status-indicator in-progress" title="In Progress" />;
    case 'Missed': return <div className="status-indicator missed" title="Missed" />;
    default: return null;
  }
};

export const Calendar = ({ currentMonth, onMonthChange, onDateSelect, challengeData, selectedDate }) => {

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isCurrentDay = (year, month, day) => {
    const today = new Date();
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
  };

  const isSelectedDay = (year, month, day, selectedDate) => {
    if (!selectedDate) return false;
    return selectedDate.getFullYear() === year && 
           selectedDate.getMonth() === month && 
           selectedDate.getDate() === day;
  };

  const handlePrevMonth = () => {
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Weekday headers
    weekdays.forEach(day => {
      days.push(<div key={`weekday-${day}`} className="calendar-weekday">{day}</div>);
    });

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayData = challengeData[dateStr];
      let status = dayData?.Status;
      const isCurrent = isCurrentDay(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = isSelectedDay(currentMonth.getFullYear(), currentMonth.getMonth(), day, selectedDate);

      if (status !== "Completed" && status !== "In Progress" && !isCurrent && new Date(dateStr) < new Date()) {
        status = "Missed";
      }

      days.push(
        <div
          key={`day-${day}`}
          className={getStatusClass(status, isCurrent, isSelected)}
          onClick={() => onDateSelect(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
        >
          <span className="day-number">{day}</span>
          {getStatusIndicator(status)}
        </div>
      );
    }

    return days;
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="calendar-component">
      <div className="calendar-header">
        <button onClick={handlePrevMonth} className="calendar-nav-btn">
          <ChevronLeft size={20} />
        </button>
        <h3>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
        <button onClick={handleNextMonth} className="calendar-nav-btn">
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="calendar-grid">
        {renderCalendarDays()}
      </div>
      <div className="calendar-legend">
        <div className="legend-item"><span className="legend-color completed"></span>Completed</div>
        <div className="legend-item"><span className="legend-color in-progress"></span>In Progress</div>
        <div className="legend-item"><span className="legend-color missed"></span>Missed</div>
        <div className="legend-item"><span className="legend-color current"></span>Current Day</div>
      </div>
    </div>
  );
};