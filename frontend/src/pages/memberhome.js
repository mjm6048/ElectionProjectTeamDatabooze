import React from 'react';
import { useNavigate } from 'react-router-dom';

function MemberHome() {
  const navigate = useNavigate();

  const handleViewResults = async (ballotID) => {
    try {
      // Make the API call with the ID parameter
      // const response = await fetch(`https://databooze-dev.webdev.gccis.rit.edu/users/login/${ballotID}`);
      // const data = await response.json();
      
      // Assuming your results page is ComponentB, you can pass the data as state
      navigate('/results', {state: { results: "jnbkj" }});
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  return (
    <div>
      <h2>Home</h2>
      <button onClick={() => handleViewResults(1)}>View Results</button>
    </div>
  );
}

export default MemberHome;
