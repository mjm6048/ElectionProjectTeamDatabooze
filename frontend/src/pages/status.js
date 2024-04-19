import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Status(props) {
  // Access the passed state containing the results
  const { state } = useLocation();
 const usersvoted = state.status.usernames;
const votednum = usersvoted.length;
 const percentage = votednum/parseInt(state.status.usernumber);

  // Render the results
  return (
    <div>
  <h2>Status</h2>
  <h3>Users that voted</h3>
  <ul>
        {usersvoted.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
    <h3>Percentage: {percentage}%</h3>
    </div>
  );
}

export default Status;