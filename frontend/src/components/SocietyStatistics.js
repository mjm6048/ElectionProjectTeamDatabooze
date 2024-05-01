import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useLocation } from "react-router-dom";
import "./SocietyStatistics.css";
import getAverageResponseTime from "../utils/getAverageResponseTime";

const SocietyStatistics = () => {
  const { measuredAxios, getAverage } = getAverageResponseTime();
  const [statistics, setStatistics] = useState(null);
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const societyId = searchParams.get("societyID") || location.state?.societyID;

  useEffect(() => {
    const fetchSocietyStatistics = async () => {
      try {
        const token = localStorage.getItem("adtoken");
        const response = await measuredAxios({
          method: 'GET',
          url: `http://localhost:5001/users/society-statistics?societyID=${societyId}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching society statistics:", error);
      }
    };

    if (societyId) {
      fetchSocietyStatistics();
    }
  }, [societyId]);

  if (!statistics) {
    return <div className="society-statistics">Loading...</div>;
  }

  const { numOfBallots, members, avgMembers } = statistics;

  return (
    <div className="society-statistics">
      <h2>Society Statistics</h2>
      <div className="statistics-container">
        <div className="statistic-item">
          <span className="statistic-label">
            Number of Ballots (Active and Inactive):
          </span>
          <span className="statistic-value">{numOfBallots}</span>
        </div>
        <div className="statistic-item">
          <span className="statistic-label">Number of Members:</span>
          <span className="statistic-value">{members[0].user_count}</span>
        </div>
        <div className="statistic-item">
          <span className="statistic-label">
            Average Number of Members Voting in Each Election:
          </span>
          <span className="statistic-value">{avgMembers}</span>
        </div>
      </div>
    </div>
  );
};

export default SocietyStatistics;
