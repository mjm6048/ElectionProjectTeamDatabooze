// Voting.js
import React, { useState } from 'react';
import PositionItem from '../components/positionitem';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
const Voting = (props) => {
  const [positionVotes, setPositionVotes] = useState([]);
  const { state } = useLocation();
  const token = localStorage.getItem('adtoken');
  const ballotid = state.ballotid;
  const ballotItems = state.ballots;
  const candidates = state.candidates;

  const handleVoteChange = (positionId, candidateId) => {
    const existingvote = positionVotes.findIndex(vote => vote.itemID === positionId);
    
    if (existingvote !== -1) {
        // If a vote exists for the same position, update it
        setPositionVotes(prevData => {
          const updatedData = [...prevData];
          updatedData[existingvote] = {
            ...updatedData[existingvote],
            candidateID: candidateId
          };
          return updatedData;
        });
      } else {
        // If no vote exists for the same position, add a new vote
        setPositionVotes(prevData => ([
          ...prevData,
          {
            voteType: 'position',
            itemID: positionId,
            candidateID: candidateId,
            writein: ""
          }
        ]));
      }
  };

  const handleSubmit = async(event) => {
    const initiativeVotes=[];
    event.preventDefault();
   
   
  };
  const handleSubmitVote = async(event) => {
    const initiativeVotes=[];
    console.log('Form data submitted:', {ballotid,positionVotes,initiativeVotes});
    event.preventDefault();
    // Here you can handle the submission of form data
    // const response = await axios.post(`http://localhost:5001/votes`,{ headers: {"Authorization" : `Bearer ${token}`} }, {
    //     ballotid,
    //     positionVotes,
    //     initiativeVotes
    //});
  }
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
      <button onClick={handleSubmitVote} type="submit">Submit Vote</button>
    </form>
  );
};

export default Voting;
