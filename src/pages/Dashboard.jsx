// pages/Dashboard.js
import React from 'react';
import { Trophy, Calendar, Folder, Flame, Award, TrendingUp } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { ProgressChart } from '../components/ProgressChart';
import { RecentActivity } from '../components/RecentActivity';

// Mock data - in a real app this would come from an API/state management
const mockStats = {
  totalCompleted: 47,
  challengesThisMonth: 12,
  completionRate: 73,
};

export const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="page-subtitle">Overview of your FreeCodeCamp challenge progress.</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Challenges Completed"
          value={mockStats.totalCompleted}
          icon={<Trophy size={24} />}
          trend="+12 this week"
          color="primary"
        />
        <StatCard
          title="Challenges This Month"
          value={mockStats.challengesThisMonth}
          icon={<Calendar size={24} />}
          trend="Goal: 20"
          color="blue"
        />
        <StatCard
          title="Completion Rate"
          value={mockStats.completionRate}
          icon={<TrendingUp size={24} />}
          suffix="%"
          trend="+5% from last month"
          color="teal"
        />
      </div>

      <div className="dashboard-grid">
        <ProgressChart completionRate={mockStats.completionRate} />
        <RecentActivity />
      </div>
    </div>
  );
};