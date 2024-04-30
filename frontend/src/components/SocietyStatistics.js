import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SocietyStatistics.css";

const SocietyStatistics = () => {
  const [societyId, setSocietyId] = useState("");
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const fetchSocietyStatistics = async () => {
      try {
        const token = localStorage.getItem("adtoken");
        const response = await axios.get(
          `https://databooze.webdev.gccis.rit.edu:8001/users/society-statistics?societyID=${societyId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching society statistics:", error);
      }
    };

    if (societyId) {
      fetchSocietyStatistics();
    }
  }, [societyId]);

  const handleSocietyIdChange = (event) => {
    setSocietyId(event.target.value);
  };

  if (!statistics) {
    return (
      <div className="society-statistics">
        <h2>Society Statistics</h2>
        <div className="society-id-input">
          <label htmlFor="societyId">Enter Society ID:</label>
          <input
            type="text"
            id="societyId"
            value={societyId}
            onChange={handleSocietyIdChange}
            placeholder="Enter Society ID"
          />
        </div>
      </div>
    );
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
          <span className="statistic-value">{members.length}</span>
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
