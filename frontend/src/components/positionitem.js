
import Candidate from './candidate';
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import '../index.css';
import axios from "axios";
const BACKEND_URL ="http://localhost:5001";
const PositionItem = ({ positionName, positionId, candidates, onVoteChange, onWriteIn, editable, numVotesAllowed }) => {
  const navigate =  useNavigate();
  const token = localStorage.getItem('adtoken');
  const roleid = localStorage.getItem('adroleid');
  const [writeIn, setWriteIn] = useState("");
  const [selectedVotes, setSelectedVotes] = useState(0);
  const filteredcandidates = candidates.filter(candidate => candidate.itemid === positionId);
  const handleVoteChange = (candidateId) => {
    if (selectedVotes < numVotesAllowed) 
    {
      setSelectedVotes(prevVotes => prevVotes + 1);
    }
    onVoteChange(candidateId);
  };
  const handleWriteIn =(e)=>
  {
    var writein = e.target.value;
    onWriteIn(writein);
  }
  const handleAddCandidate = async(event) => {
    const candidateID = event.target.previousElementSibling.value;
    // Call a function here to submit the candidate ID
    console.log('Candidate ID submitted:',positionId, candidateID);
    const headers = {
      'Authorization': `Bearer ${token}`
  }
  try
  {
  const response =  await axios.post(`${BACKEND_URL}/candidate`,{itemid:positionId, candidateid:candidateID},{headers});
     
  if(response.status === 200)
  {
    alert("candidate added ");
    window.location.reload();

  }
  }
catch(error)
{
  console.error(error);
    
    if (error.response.status!=null && (error.response.status === 401 || error.response.status === 400))
    {
      alert("candidate not added");
    }
      else
    { 
      alert("Internal server error");
  
    }
}
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
      {roleid < 3 ? (
        <label>
          Write in:
          <input type="text" disabled={selectedVotes > 0} onChange={handleWriteIn} />
        </label>
        ) : roleid > 2 && editable ? (
          <div>
            <label>Enter Candidate ID: </label>
            <input type = "number" />
          <button onClick={handleAddCandidate}>Add candidate</button>
          </div>
        ) : null
      }
            </div>
      );
};

export default PositionItem;
