// Voting.js
import React, { useState, useEffect } from 'react';
import PositionItem from '../components/positionitem';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
const Voting = (props) => {
  const token = localStorage.getItem('adtoken');
  const [ballotItems,setBallotItems]= useState([]);
  const [candidates,setCandidates]=useState([]);
  const { state } = useLocation();
  const ballotid = state.ballotid;
  useEffect( ()=>
  {
    
       getBallotItems();
       getCandidates();
      
  },[])
  
  const getBallotItems = async () =>
  {
    var res = await axios.get(`http://localhost:5001/ballotitems?ballotID=${ballotid}`,{ headers: {"Authorization" : `Bearer ${token}`} })
    console.log(res.data);
    setBallotItems(res.data);
  }
  const getCandidates = async()=>
  {
    var response = await axios.get(`http://localhost:5001/candidates?ballotID=${ballotid}`,{ headers: {"Authorization" : `Bearer ${token}`} });
    setCandidates(response.data);

  }

  const [positionVotes, setPositionVotes] = useState([]);
  const [initiativeVotes, setInitiativeVotes] = useState([]);
  const history= useNavigate();

  const handleVoteChange = (positionId, candidateId) => {
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
  const updateInitiativeData = (itemid,response)=>
  {
    setInitiativeVotes(prevData => {
      var newdata = [...prevData,
        {
          voteType: 'initiative',
          itemID: itemid,
          initiativeResponse: response,
          writein: ""
        }];
      return newdata;
    });
    
  console.log(initiativeVotes);
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
   
   
  };
  const handleResetVote=()=>
  {

  };
  const handleSubmitVote = async(event) => {
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    console.log('Form data submitted:', {ballotid,positionVotes,initiativeVotes});
    event.preventDefault();
    var data = {ballotid,positionVotes,initiativeVotes};
    // Here you can handle the submission of form data
    try
    {
    const response = await axios.post(`http://localhost:5001/votes`,data,{headers});
    if(response.status === 200)
    {
      alert("Vote succesfully cast");
      history("/memberhome");

    }
    }
catch(error)
  {
    console.error(error);
      
      if (error.response.status!=null && (error.response.status === 401 || error.response.status === 400))
      {
        alert("vote not cast");
      }
        else
      { 
        alert("Internal server error");
    
      }
  }
  }
  return (
    <form onSubmit={handleSubmit}>
      {ballotItems.map(ballotItem => {
        if (ballotItem.itemtype === 'position') {
          return (
            <PositionItem
              key={ballotItem.itemid}
              positionName={ballotItem.itemname}
              positionId={ballotItem.itemid}
              candidates={candidates}
              numVotesAllowed={ballotItem.numvotesallowed}
              onVoteChange={(candidateId) => handleVoteChange(ballotItem.itemid, candidateId)}
            />
          );
        } else {
          return (
            <div>
            <h2 key={ballotItem.itemid}>{ballotItem.itemname}</h2>
            <button onClick ={()=>updateInitiativeData(ballotItem.itemid,"yes")} disabled = {initiativeVotes.some(vote => vote.itemID === ballotItem.itemid && vote.initiativeResponse!="yes")}>Yes</button>
            <button onClick ={()=>updateInitiativeData(ballotItem.itemid,"no")} disabled = {initiativeVotes.some(vote => vote.itemID === ballotItem.itemid && vote.initiativeResponse!="no")}>No</button>
            </div>
          );
        }
      })}
      <button onClick={handleSubmitVote} type="submit">Submit Vote</button>
      <button onClick={handleResetVote}>Reset Votes</button>
    </form>
  );
} 

export default Voting;
