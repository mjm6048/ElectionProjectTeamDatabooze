
import React, { useEffect, useState } from "react";
import Ballot from "../components/ballot";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";


function MemberHome(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [ballots,setBallots]=useState([]);

  useEffect( ()=>
  {
  
    if (localStorage.getItem("adtoken"))
    {
       getBallots();
      
     
       
    }

  },[])
  
  const getBallots = async () =>
  {
    var token= localStorage.getItem("adtoken");
    var res = await axios.get("http://localhost:5001/ballots",{ headers: {"Authorization" : `Bearer ${token}`} });
    console.log(res.data);
    setBallots(Object.values(res.data));
  }
  const token = localStorage.getItem('adtoken');
  const handleViewResults = async (ballotID) => {
    try {
      // Make the API call with the ID parameter
      const response = await axios.get(`http://localhost:5001/results?ballotID=${ballotID}`,{ headers: {"Authorization" : `Bearer ${token}`} });
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
      const response = await  axios.get(`http://localhost:5001/status?ballotID=${ballotID}`,{ headers: {"Authorization" : `Bearer ${token}`} });
      const data = await response.data;
      
      navigate('/status', {state: { status: data }});
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };


  return (
    <div>
      <h2>Home</h2>
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
              disabled = {ballot.uservoted}
            />
          );
        } else if (ballot.ballotstatus === 'completed') {
          return (
            <Ballot
              key={index}
              name={ballot.ballotname}
              status={ballot.ballotstatus}
              onViewResults={() => handleViewResults(ballot.ballotid)} // You need to implement handleViewResults
            />
          );
        } 
        else {
          return null; // Don't render the ballot if status is 'not started'
        }
      })}

    </div>
      </div>


    );
}

export default MemberHome;
