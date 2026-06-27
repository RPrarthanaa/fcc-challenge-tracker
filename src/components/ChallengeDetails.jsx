// components/ChallengeDetails.js
import { React } from 'react';
import { Link } from 'react-router-dom';
import { X, Calendar as CalendarIcon, Folder, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export const ChallengeDetails = ({ date, data, onClose }) => {

  const formatDate = (dateObj) => {
    return dateObj.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed': return { icon: CheckCircle, label: 'Completed', color: '#22c55e' };
      case 'in-progress': return { icon: Clock, label: 'In Progress', color: '#3b82f6' };
      case 'missed': return { icon: AlertCircle, label: 'Missed', color: '#ef4444' };
      default: return { icon: FileText, label: 'No Activity', color: '#6b7280' };
    }
  };

  const StatusIcon = data?.status ? getStatusConfig(data.status).icon : FileText;
  const statusConfig = data?.status ? getStatusConfig(data.status) : { label: 'No Activity', color: '#6b7280' };

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
        
        {data?.title ? (
          <>
            <div className="detail-item">
              <FileText size={18} />
              <strong>Challenge Title:</strong>
              <span>{data.title}</span>
            </div>
            
            <div className="detail-item">
              <Folder size={18} />
              <strong>Files Saved:</strong>
              <span>{data.filesCount} files</span>
            </div>

            <div className="detail-item" style={{ justifyContent: 'center' }}>
              <Link to={`/challenge/${date.toISOString().split('T')[0]}`} className="btn-primary">
                View Challenge
              </Link>
            </div>
          </>
        ) : (
          <div className="detail-item no-data">
            <p>No challenge logged for this day.</p>
            <Link to={`/challenge/${date.toISOString().split('T')[0]}`} className="btn-primary">
              Add Challenge
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};