// Candidate.js
import React from 'react';

const Candidate = ({ firstName, lastName,titles, photoUrl, description, onVoteChange }) => {
  const handleVoteChange = () => {
    onVoteChange();
  };

  return (
    <div>
      <img src={photoUrl} alt={`${firstName} ${lastName}`} />
      <h4>{`${firstName} ${lastName}`}</h4>
      <p>{description}</p>
      <button onClick={handleVoteChange}>Vote</button>
    </div>
  );
};

export default Candidate;
