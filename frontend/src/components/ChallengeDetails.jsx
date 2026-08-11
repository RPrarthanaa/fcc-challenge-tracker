// components/ChallengeDetails.js
import React from 'react';
import { Link } from 'react-router-dom';
import { X, Calendar as CalendarIcon, Folder, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { calendarApi } from '../api/calendar';

export const ChallengeDetails = ({ date, data, onClose }) => {

  const handleAddChallenge = async (date) => {
    try {
      const response = await calendarApi.addChallenge(date, {
        "title" : "Untitled Challenge",
        "question" : "Enter the challenge question for the selected date",
        "status" : "In Progress"
      });
      
      if (response.data.success) {
        console.log("Challenge successfully added");
      }
    } catch (error) {
      console.error(error);
    }
  };


  const formatDate = (dateObj) => {
    return dateObj.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const longDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Completed': return { icon: CheckCircle, label: 'Completed', color: '#22c55e' };
      case 'In Progress': return { icon: Clock, label: 'In Progress', color: '#3b82f6' };
      case 'Missed': return { icon: AlertCircle, label: 'Missed', color: '#ef4444' };
      default: return { icon: FileText, label: 'No Activity', color: '#6b7280' };
    }
  };

  const StatusIcon = data?.Status ? getStatusConfig(data.Status).icon : FileText;
  const statusConfig = data?.Status ? getStatusConfig(data.Status) : { label: 'No Activity', color: '#6b7280' };

  return (
    <div className="challenge-details">
      <div className="details-header">
        <h3>Challenge Details</h3>
        <button onClick={onClose} className="close-btn">
          <X size={20} />
        </button>
      </div>
      
      <div className="details-content">
        <div className="detail-item date">
          <CalendarIcon size={18} />
          <span>{formatDate(date)}</span>
        </div>
        
        <div className="detail-item status">
          <StatusIcon size={18} style={{ color: statusConfig.color }} />
          <span style={{ color: statusConfig.color }}>{statusConfig.label}</span>
        </div>
        
        {data?.Title ? (
          <>
            <div className="detail-item">
              <FileText size={18} />
              <strong>Challenge Title:</strong>
              <span>{data.Title}</span>
            </div>
            
            {/*
            <div className="detail-item">
              <Folder size={18} />
              <strong>Files Saved:</strong>
              <span>{data.Editor.size} files</span>
            </div>
            */}

            <div className="detail-item" style={{ justifyContent: 'center' }}>
              <Link 
                to={`/challenge/${longDate(date)}`} className="btn-primary"
                state={{ existingPage: true }}
              >
                View Challenge
              </Link>
            </div>
          </>
        ) : (
          <div className="detail-item no-data">
            <p>No challenge logged for this day.</p>
            <Link 
                to={`/challenge/${longDate(date)}`} className="btn-primary"
                state={{ existingPage: false }}
                onClick={() => handleAddChallenge(longDate(date))}
              >
                Add Challenge
              </Link>
          </div>
        )}
      </div>
    </div>
  );
};