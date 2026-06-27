// components/RecentActivity.js
import React from "react";

export const RecentActivity = () => {
  const activities = [
    { id: 1, title: "Last Posted On", date: "10-02-2026", status: "on-track" },
  ];

  const activity = activities[0];

  const getStatusColor = (status) => {
    switch (status) {
      case "on-track":
        return "green";
      case "late":
        return "red";
      default:
        return "gray";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "on-track":
        return "ON TRACK";
      case "late":
        return "LATE";
      default:
        return "UNKNOWN";
    }
  };

  return (
    <div className="recent-activity">
      <h3>Recent Activity</h3>

      {/* ONLY ONE ACTIVITY ITEM */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0.5rem 0",
          borderBottom: "1px solid var(--border)",
          alignItems: "center",
        }}
      >
        <span>{activity.title}</span>
        <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
          {activity.date}
        </span>
      </div>

      {/* STATUS CONTAINER (CENTERED) */}
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <div
          style={{
            padding: "0.75rem 1.25rem",
            borderRadius: "10px",
            fontWeight: "bold",
            color: "white",
            backgroundColor: getStatusColor(activity.status),
            letterSpacing: "1px",
          }}
        >
          {getStatusText(activity.status)}
        </div>
      </div>
    </div>
  );
};