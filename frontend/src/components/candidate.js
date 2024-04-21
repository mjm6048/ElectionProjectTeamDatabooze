// Candidate.js
import React, { useState } from 'react';

const Candidate = ({ firstName, lastName,titles, photoUrl, description, onVoteChange, disabled }) => {
  const [pressed,setPressed] = useState(false);
  const handleVoteChange = () => {
    setPressed(true);
    onVoteChange();
  };
 
  return (
    <div className='candidate'>
      <img src={photoUrl} alt={`${firstName} ${lastName}`} />
      <h4 className='candidate-name'>{`${firstName} ${lastName}`}</h4>
      <p className='candidate-details'>{description}</p>
      <button className = {`vote-button ${pressed ? 'pressed' : ''}`} disabled = {(disabled && !pressed)} onClick={handleVoteChange}>Vote</button>
    </div>
  );
};

export default Candidate;
