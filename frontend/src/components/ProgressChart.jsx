// components/ProgressChart.js
import React from 'react';

export const ProgressChart = ({ completionRate }) => {
  return (
    <div className="progress-chart">
      <h3>Progress Overview</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Overall Progress</span>
            <span style={{ fontWeight: 600 }}>{completionRate}%</span>
          </div>
          <div style={{ height: '8px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${completionRate}%`, height: '100%', background: 'linear-gradient(90deg, var(--gradient-start), var(--gradient-end))', borderRadius: '4px', transition: 'width 0.6s ease' }}></div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>This Week</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>5 {/* test value */}</div>
          </div>
          <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Goal Progress</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>65% {/* test value */}</div>
          </div>
        </div>
      </div>
    </div>
  );
};