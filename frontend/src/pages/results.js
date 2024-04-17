import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
function Results(props) {
  // Access the passed state containing the results
  const navigate = useNavigate();
  const { state } = useLocation();
 const results = state.results.result;
  const status  = state.results.status;

  // Render the results
  return (
    <div>
      <h2>Results</h2>
      <ul>
      
      </ul>
      <h2>Results</h2>
      <ul>
]
      </ul>
    </div>
  );
}

export default Results;
