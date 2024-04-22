
import Candidate from './candidate';
import React, { useEffect, useState } from "react";
import '../index.css';

const PositionItem = ({ positionName, positionId, candidates, onVoteChange,numVotesAllowed }) => {
   // Filter candidates based on currentItem's itemid
  //const [pressedButtonIndex, setPressedButtonIndex] = useState(null);
  const [selectedVotes, setSelectedVotes] = useState(0);
  const filteredcandidates = candidates.filter(candidate => candidate.itemid === positionId);
  const handleVoteChange = (candidateId) => {
    if (selectedVotes < numVotesAllowed) 
    {
      setSelectedVotes(prevVotes => prevVotes + 1);
    }
    onVoteChange(candidateId);
  };
  return (
    <div className='ballot-item'>
      <h3>{positionName}</h3>
      <div className='candidate-container'>
      {filteredcandidates.map((candidate) => (
        <Candidate className = "candidate"
          key={candidate.candidateid}
          firstName={candidate.firstname}
          lastName={candidate.lastname}
          titles = {candidate.titles}
          photoUrl={candidate.photo}
          description={candidate.description}
          onVoteChange={() => handleVoteChange(candidate.candidateid)}
          disabled={selectedVotes >= numVotesAllowed} 
        />

      ))}
      </div>
    </div>
  );
};

export default PositionItem;
