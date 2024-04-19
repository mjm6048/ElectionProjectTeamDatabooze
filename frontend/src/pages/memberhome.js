
import React, { useEffect, useState } from "react";
import Ballot from "../components/ballot";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";


function MemberHome(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const ballots = Object.values(state)[0];
  console.log(ballots);
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
      // Make the API call with the ID parameter
      const itemresponse = await  axios.get(`http://localhost:5001/ballotitems?ballotID=${ballotID}`,{ headers: {"Authorization" : `Bearer ${token}`} });
      const itemdata = await itemresponse.data;
      const candidateresponse = await  axios.get(`http://localhost:5001/candidates?ballotID=${ballotID}`,{ headers: {"Authorization" : `Bearer ${token}`} });
      const candidatedata =  await candidateresponse.data;
      navigate('/voting', {state: { ballots: itemdata, candidates: candidatedata, ballotid: ballotID }});
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
              onVote={() => handleVote(ballot.ballotid)} // You need to implement handleVote
              onViewStatus={() => handleViewStatus(ballot.ballotid)} // You need to implement handleViewResults
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
