// pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Trophy, Calendar, Folder, Flame, Award, TrendingUp } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { ProgressChart } from '../components/ProgressChart';
import { RecentActivity } from '../components/RecentActivity';
import { dashboardApi } from '../api/dashboard'


export const Dashboard = () => {
  const today = new Date();
  const goal = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const totalDays = Math.floor((new Date() - new Date("2025-08-17")) / (1000 * 60 * 60 * 24));

  const [ totalCompleted, setTotalChallenges ] = useState(0);
  const [ thisWeek, setThisWeek ] = useState(0);
  const [ thisMonth, setThisMonth ] = useState(0);
  const [ completionRate, setCompletionRate ] = useState(0);
  const [ lastPosted, setLastPosted ] = useState();


  const fetchMainStats = async () => {
    try {
      const response = await dashboardApi.getMainStats();

      if (response.data.success) {
        const completed = response.data.stats.totalCompleted;
        setTotalChallenges(completed);
        setThisWeek(response.data.stats.thisWeek);
        setThisMonth(response.data.stats.thisMonth);
        setLastPosted(response.data.stats.lastActivityDate);
        setCompletionRate(((completed / totalDays) * 100).toFixed(2));

      }
    } catch (error) {
      console.log("Error fetching main stats:", error);
    }
  };

  useEffect(() => {
    fetchMainStats();
  }, []);

  const getStatus = (completionRate) => {
    if (completionRate == 100) {
      return "on-track";
    }
    return "late";
  };

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
          value={totalCompleted}
          icon={<Trophy size={24} />}
          trend={`+${thisWeek} this week`}
          color="primary"
        />
        <StatCard
          title="Challenges This Month"
          value={thisMonth}
          icon={<Calendar size={24} />}
          trend={`Goal: ${goal}`}
          color="blue"
        />
        <StatCard
          title="Completion Rate"
          value={[completionRate]}
          icon={<TrendingUp size={24} />}
          suffix="%"
          trend={'since Aug 17, 2025'}
          color="teal"
        />
      </div>

      <div className="dashboard-grid">
        <ProgressChart completionRate={completionRate} thisWeek={thisWeek} goal={goal} />
        <RecentActivity lastPosted={lastPosted} status={getStatus(completionRate)}/>
      </div>
    </div>
  );
};