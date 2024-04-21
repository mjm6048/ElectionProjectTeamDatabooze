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

  const handleVoteChange = (positionId, candidateId, numVotesAllowed) => {
    //const existingvote = positionVotes.filter(vote => vote.itemID === positionId);
        // If no vote exists for the same position, add a new vote
        setPositionVotes(prevData => {
          var newdata = [...prevData,
            {
              voteType: 'position',
              itemID: positionId,
              candidateID: candidateId,
              writein: ""
            }];
          return newdata;
        });
        
      console.log(positionVotes);
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
          numVotesAllowed={ballotItem.numvotesallowed}
          onVoteChange={(candidateId) =>handleVoteChange(ballotItem.itemid, candidateId, ballotItem.numvotesallowed)}
        />
      ))}
      <button onClick={handleSubmitVote} type="submit">Submit Vote</button>
    </form>
  );
};

export default Voting;
