// Voting.js
import React, { useState } from 'react';
import PositionItem from '../components/positionitem';
import { useNavigate, useLocation } from 'react-router-dom';

const Voting = (props) => {
  const [formData, setFormData] = useState({});
  const { state } = useLocation();
  const ballotItems = state.ballots;
  const candidates = state.candidates;
  console.log(ballotItems);
  console.log(candidates);
  const handleVoteChange = (positionId, candidateId) => {
    setFormData(prevData => ({
      ...prevData,
      [positionId]: candidateId
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the submission of form data
    console.log('Form data submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {ballotItems.map(ballotItem => (
        <PositionItem
          key={ballotItem.itemid}
          positionName={ballotItem.itemname}
          positionId={ballotItem.itemid}
          candidates={candidates}
          onVoteChange={(candidateId) =>handleVoteChange(ballotItem.itemid, candidateId)}
        />
      ))}
      <button type="submit">Submit Vote</button>
    </form>
  );
};

export default Voting;
