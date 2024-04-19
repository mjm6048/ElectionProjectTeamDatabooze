import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SystemStatistics.css";

const SystemStatistics = () => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/users/system-statistics"
        );
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching system statistics:", error);
      }
    };

    fetchStatistics();
  }, []);

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
            <p>
              Stats for Query times which is then extrapolated into a bar chart
              or pie chart to show average
            </p>
            <div className="query-time-value">
              {averageQueryTime[0].calculate_average_query_time}
            </div>
          </div>
        </div>
        <div className="statistics-column">
          <div className="http-time-logging">
            <h3>HTTP Time Logging:</h3>
            <p>
              Stats for HTTP response times which is then extrapolated into a
              bar chart or pie chart to show average
            </p>
            {/* You can add a chart component here to visualize the HTTP response times */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatistics;
