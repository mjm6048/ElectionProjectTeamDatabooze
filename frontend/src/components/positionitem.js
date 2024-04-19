// BallotItem.js
import React from 'react';
import Candidate from './candidate';
import '../index.css';

const PositionItem = ({ positionName, positionId, candidates, onVoteChange }) => {
   // Filter candidates based on currentItem's itemid
  const filteredcandidates = candidates.filter(candidate => candidate.itemid === positionId);
  const handleVoteChange = (candidateId) => {
    onVoteChange(candidateId);
  };
  return (
    <div className='ballot-item'>
      <h3>{positionName}</h3>
      <div className='candidate-container'>
      {filteredcandidates.map(candidate => (
        <Candidate className = "candidate"
          key={candidate.candidateid}
          firstName={candidate.firstname}
          lastName={candidate.lastname}
          titles = {candidate.titles}
          photoUrl={candidate.photo}
          description={candidate.description}
          onVoteChange={() => handleVoteChange(candidate.candidateid)}
        />
      ))}
      </div>
    </div>
  );
};

export default PositionItem;
