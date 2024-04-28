
import React, { useEffect, useState } from "react";
import Ballot from "../components/ballot";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
const BACKEND_URL ="http://localhost:5001";

function MemberHome(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [ballots,setBallots]=useState([]);
  const roleid = localStorage.getItem('adroleid');
  useEffect( ()=>
  {
  
    if (localStorage.getItem("adtoken"))
    {
      if(state!=null)
      {
        getBallots(state.society)
      }
      else
      {
      getBallots(0);
      }
      
     
       
    }

  },[])
  
  const getBallots = async (societyID) =>
  {
    var token= localStorage.getItem("adtoken");
    if(societyID ==0)
    {var res = await axios.get(`${BACKEND_URL}/ballots`,{ headers: {"Authorization" : `Bearer ${token}`} });}
    else
    {
      var res = await  axios.get(`${BACKEND_URL}/ballots?societyID=${societyID}`,{ headers: {"Authorization" : `Bearer ${token}`} });
    }
    //console.log(res.data);
    setBallots(Object.values(res.data));
  }
  const token = localStorage.getItem('adtoken');
  const handleViewResults = async (ballotID) => {
    try {
      // Make the API call with the ID parameter
      const response = await axios.get(`${BACKEND_URL}/results?ballotID=${ballotID}`,{ headers: {"Authorization" : `Bearer ${token}`} });
      const data = await response.data;
      navigate('/results', {state: { results: data }});
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const handleVote = async (ballotID) => {
    try {
   
        navigate('/voting', {state: { ballotid: ballotID }});
  
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };
  const handleViewStatus = async (ballotID) => {
    try {
      // Make the API call with the ID parameter
      const response = await  axios.get(`${BACKEND_URL}/status?ballotID=${ballotID}`,{ headers: {"Authorization" : `Bearer ${token}`} });
      const data = await response.data;
      
      navigate('/status', {state: { status: data }});
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };
  const handleEdit = async(ballotID)=>
  {
    try {
      // Make the API call with the ID parameter

      navigate('/editBallot', {state: { ballotid:ballotID }});
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  }


  return (
    <div>
      <h2>Home</h2>
      {roleid > 2 && (
   <div> <button onClick={()=>navigate("/editBallot")}>Create Ballot</button>
    <button onClick={()=>navigate("/createCandidate")}>Create Candidate</button>
   </div>
  )}
      <div>
      {ballots.map((ballot, index) => {
         if (ballot.ballotstatus === 'active') {
          return (
            <Ballot
              key={index}
              name={ballot.ballotname}
              status={ballot.ballotstatus}
              onVote={()=> handleVote(ballot.ballotid)} 
              onViewStatus={() => handleViewStatus(ballot.ballotid)} 
              onView={()=>navigate('/voting', {state:{ballotid:ballot.ballotid}})}
              disabled = {ballot.uservoted}
            />
          );
        } else if (ballot.ballotstatus === 'completed') {
          return (
            <Ballot
              key={index}
              name={ballot.ballotname}
              status={ballot.ballotstatus}
              onViewResults={() => handleViewResults(ballot.ballotid)} 
              onView={()=>navigate('/voting', {state:{ballotid:ballot.ballotid}})}// You need to implement handleViewResults
            />
          );
        } 
        else {
          return (
            <Ballot
              key={index}
              name={ballot.ballotname}
              status={ballot.ballotstatus}
              onEdit={() => handleEdit(ballot.ballotid)} 
              onView={()=>navigate('/voting', {state:{ballotid:ballot.ballotid, status:'not started'}})}// You need to implement handleViewResults
            />
          ); 
        }
      })}

    </div>
      </div>


    );
}

export default MemberHome;
