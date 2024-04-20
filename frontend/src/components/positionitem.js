
import Candidate from './candidate';
import React, { useEffect, useState } from "react";
import '../index.css';

const PositionItem = ({ positionName, positionId, candidates, onVoteChange }) => {
   // Filter candidates based on currentItem's itemid
  const [pressedButtonIndex, setPressedButtonIndex] = useState(null);
  const filteredcandidates = candidates.filter(candidate => candidate.itemid === positionId);
  const handleVoteChange = (candidateId,index) => {
    setPressedButtonIndex(index)
    onVoteChange(candidateId);
  };
  return (
    <div className='ballot-item'>
      <h3>{positionName}</h3>
      <div className='candidate-container'>
      {filteredcandidates.map((candidate,index) => (
        <Candidate className = "candidate"
          key={candidate.candidateid}
          firstName={candidate.firstname}
          lastName={candidate.lastname}
          titles = {candidate.titles}
          photoUrl={candidate.photo}
          description={candidate.description}
          onVoteChange={() => handleVoteChange(candidate.candidateid,index)}
          pressed = {index === pressedButtonIndex}
        />
      ))}
      </div>
    </div>
  );
};

export default PositionItem;
