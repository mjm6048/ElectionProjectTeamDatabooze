// BallotItem.js
import React from 'react';
import Candidate from './candidate';

const PositionItem = ({ positionName, PositionId, candidates, onVoteChange }) => {
   // Filter candidates based on currentItem's itemid
  const filteredcandidates = candidates.find(candidate => candidate.itemid === PositionId);
  const handleVoteChange = (candidateId) => {
    onVoteChange(candidateId);
  };
  return (
    <div>
      <h3>{positionName}</h3>
      {filteredcandidates.map(candidate => (
        <Candidate
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
  );
};

export default PositionItem;
