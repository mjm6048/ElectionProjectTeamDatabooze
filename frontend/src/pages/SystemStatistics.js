import React, { useState, useEffect } from "react";
import axios from "axios";
import getAverageResponseTime from "../utils/getAverageResponseTime";
import "./SystemStatistics.css";

const SystemStatistics = () => {
  const { measuredAxios, getAverage } = getAverageResponseTime();
  const [statistics, setStatistics] = useState(null);
  const [averageTime, setAverageTime] = useState(0);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        var token = localStorage.getItem("adtoken");
        const response = await measuredAxios({
          method: "GET",
          url: "https://databooze.webdev.gccis.rit.edu:8001/users/system-statistics",
          headers: { Authorization: `Bearer ${token}` }
        });
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching system statistics:", error);
      }
    };

    // Fetch statistics initially
    fetchStatistics();

    // Fetch statistics every 10 seconds
    const intervalId = setInterval(fetchStatistics, 10000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, []); // No dependencies, so this useEffect runs only once on mount

  useEffect(() => {
    // Update average response time whenever statistics are updated
    const avgTime = getAverage();
    setAverageTime(avgTime);
  }, [statistics, getAverage]);

  if (!statistics) {
    return <div>Loading...</div>;
  }

  const { averageQueryTime, activeElections, loggedInUserArrayLength } =
    statistics;

  return (
    <div className="system-statistics">
      <h2>System Statistics</h2>
      <div className="statistic-row">
        <span className="statistic-label">Number of Active Elections</span>
        <div className="statistic-value">
          {activeElections[0].active_elections_count} active elections
        </div>
      </div>
      <div className="statistic-row">
        <span className="statistic-label">
          Number of Currently Logged-In Users
        </span>
        <div className="statistic-value">
          {loggedInUserArrayLength} logged in users
        </div>
      </div>

      <div className="statistics-columns">
        <div className="statistics-column">
          <div className="query-time-logging">
            <h3>Query Time Logging:</h3>
            <p></p>
            <div className="query-time-value">
              {averageQueryTime[0].calculate_average_query_time}
            </div>
          </div>
        </div>
        <div className="statistics-column">
          <div className="http-time-logging">
            <h3>HTTP Time Logging:</h3>
            <p> Average response time: {averageTime.toFixed(2)}ms </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatistics;