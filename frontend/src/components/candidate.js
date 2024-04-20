// Candidate.js
import React from 'react';

const Candidate = ({ firstName, lastName,titles, photoUrl, description, onVoteChange,pressed }) => {
  const handleVoteChange = () => {
    onVoteChange();
  };

  return (
    <div className={`candidate ${pressed ? 'pressed' : ''}`}>
      <img src={photoUrl} alt={`${firstName} ${lastName}`} />
      <h4 className='candidate-name'>{`${firstName} ${lastName}`}</h4>
      <p className='candidate-details'>{description}</p>
      <button className = 'vote-button' onClick={handleVoteChange}>Vote</button>
    </div>
  );
};

export default Candidate;
