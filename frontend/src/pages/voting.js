// Voting.js
import React, { useState, useEffect } from 'react';
import PositionItem from '../components/positionitem';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
const BACKEND_URL ="https://databooze.webdev.gccis.rit.edu:8001";
const Voting = (props) => {
  const token = localStorage.getItem('adtoken');
  const roleid = localStorage.getItem('adroleid');
  const [ballotItems,setBallotItems]= useState([]);
  const [candidates,setCandidates]=useState([]);
  const { state } = useLocation();
  var editable = false;
  if(state.status!=null){
    var editable = true;
  }
 
  const navigate = useNavigate();
  const ballotid = state.ballotid;
  useEffect( ()=>
  {
    
       getBallotItems();
       getCandidates();
      
  },[])
  
  const getBallotItems = async () =>
  {
    var res = await axios.get(`${BACKEND_URL}/ballotitems?ballotID=${ballotid}`,{ headers: {"Authorization" : `Bearer ${token}`} })
    setBallotItems(res.data);
  }
  const getCandidates = async()=>
  {
    var response = await axios.get(`${BACKEND_URL}/candidates?ballotID=${ballotid}`,{ headers: {"Authorization" : `Bearer ${token}`} });
    setCandidates(response.data);
    console.log(candidates);

  }

  const [positionVotes, setPositionVotes] = useState([]);
  const [initiativeVotes, setInitiativeVotes] = useState([]);
  const history= useNavigate();

  const handleVoteChange = (positionId, candidateId) => {
    //const existingvote = positionVotes.filter(vote => vote.itemID === positionId);
        // If no vote exists for the same position, add a new vote
        setPositionVotes(prevData => {
          var exisitngIndex = prevData.findIndex(item=>item.itemID == positionId);
          if(exisitngIndex == -1)
          {var newdata = [...prevData,
            {
              voteType: 'position',
              itemID: positionId,
              candidateID: candidateId,
              writein: ""
            }];
          return newdata;
          }
          else
          {
            prevData[exisitngIndex]=   {
              voteType: 'position',
              itemID: positionId,
              candidateID: candidateId,
              writein: ""
            };
            return prevData;
          }
        });
        
      console.log(positionVotes);
  };
  const handleWriteIn=(itemid,type,e)=>
  {
    
    
    if(type == 'position')
    {
      setPositionVotes(prevData => {
        var exisitngIndex = prevData.findIndex(item=>item.itemID == itemid);
        if(exisitngIndex == -1)
        {var newdata = [...prevData,
          {
            voteType: 'position',
            itemID: itemid,
            writein: e
          }];
        return newdata;
        }
        else
        {
          prevData[exisitngIndex]=   {
            voteType: 'position',
            itemID: itemid,
            writein: e
          };
          return prevData;
        }
      });
     
    }
    else
    {var writein = e.target.value;
      setInitiativeVotes(prevData => {
        var exisitngIndex = prevData.findIndex(item=>item.itemID == itemid);
        if(exisitngIndex == -1)
        {var newdata = [...prevData,
          {
            voteType: 'initiative',
            itemID: itemid,
            writein: writein
          }];
        return newdata;
        }
        else
        {
          prevData[exisitngIndex]=   {
            voteType: 'initiative',
            itemID: itemid,
            writein: writein
          };
          return prevData;
        }
      });
    }
    
    
    console.log(initiativeVotes);
  }

  const updateInitiativeData = (itemid,response)=>
  {
    setInitiativeVotes(prevData => {
      var exisitngIndex = prevData.findIndex(item=>item.itemID == itemid);
      if(exisitngIndex == -1)
      {var newdata = [...prevData,
        {
          voteType: 'initiative',
          itemID: itemid,
          initiativeResponse:response,
          writein: ""
        }];
      return newdata;
      }
      else
      {
        prevData[exisitngIndex]=   {
          voteType: 'initiative',
          itemID: itemid,
          initiativeResponse: response,
          writein:""
        };
        return prevData;
      }
    });
  console.log(positionVotes);
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
  };
  const handleResetVote=()=>
  {
    window.location.reload();
  };
  const handleSubmitVote = async(event) => {
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    console.log('Form data submitted:', {ballotid,positionVotes,initiativeVotes});
    event.preventDefault();
    var data = {ballotid,positionVotes,initiativeVotes};
   
    try
    {
    const response = await axios.post(`${BACKEND_URL}/votes`,data,{headers});
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
  const isButtonClicked=(id,res) =>{ 
    var r = initiativeVotes.some(vote => vote.itemID === id && vote.initiativeResponse==res);
    return r;
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
              onWriteIn={(writein)=>handleWriteIn(ballotItem.itemid,ballotItem.itemtype,writein)}
              onVoteChange={(candidateId) => handleVoteChange(ballotItem.itemid,candidateId)}
              editable = {editable}
              onEdit ={()=>navigate('/editBallot',{state:{itemid:ballotItem.itemid}})}
            />
          );
        } else {

          return (
            <div>
            <h2 key={ballotItem.itemid}>{ballotItem.itemname}</h2>
            {roleid < 3 && (
            <div>
              <button className={isButtonClicked(ballotItem.itemid, "yes") ? 'gray-button' : ''} onClick={() => updateInitiativeData(ballotItem.itemid, "yes")} disabled={initiativeVotes.some(vote => vote.itemID === ballotItem.itemid && vote.initiativeResponse !== "yes")}>Yes</button>
              <button className={isButtonClicked(ballotItem.itemid, "no") ? 'gray-button' : ''} onClick={() => updateInitiativeData(ballotItem.itemid, "no")} disabled={initiativeVotes.some(vote => vote.itemID === ballotItem.itemid && vote.initiativeResponse !== "no")}>No</button>
              <label>Write in:
                <input type="text" key={ballotItem.itemid} onChange={(e) => handleWriteIn(ballotItem.itemid, ballotItem.itemtype, e)}></input>
              </label>
            </div>
            )}

            </div>
          );
        }
      })}
    {roleid < 3 ? (
      <div>
        <button onClick={handleSubmitVote} type="submit">Submit Vote</button>
        <button onClick={handleResetVote}>Reset Votes</button>
      </div>
    ) : roleid > 2 && editable ? (
      <div>
        <button onClick={()=>navigate('/addBallotItem',{state:{ballotid:ballotid,itemtype:'position'}})}>Add position ballot</button>
        <button onClick={()=>navigate('/addBallotItem',{state:{ballotid:ballotid,itemtype:'initiative'}})}> Add initiative ballot</button>
      </div>
    ) : null}
        </form>
      );
} 

export default Voting;
