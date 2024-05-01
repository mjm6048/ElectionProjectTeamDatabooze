import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
const BACKEND_URL ="https://databooze.webdev.gccis.rit.edu:8001";
function AddBallotItemPage(props) {
  const navigate = useNavigate();
  const { state } = useLocation();

  const token = localStorage.getItem('adtoken');
  const ballotid = state.ballotid;
  const itemtype = state.itemtype;
 
 
  const [formData, setFormData] = useState({
    ballotid:ballotid,
    itemtype:itemtype,
    numvotesallowed:1
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //ballotid,ballotname,startdate,enddate,societyid,edit
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    console.log(formData);
    try
    {
    const response =  await axios.post(`${BACKEND_URL}/ballotitems`,formData,{headers});
       
    if(response.status === 200)
    {
      alert("Ballot Item created");

    }
    }
catch(error)
  {
    console.error(error);
      
      if (error.response.status!=null && (error.response.status === 401 || error.response.status === 400))
      {
        alert("ballot item not created");
      }
        else
      { 
        alert("Internal server error");
    
      }
  }
  };

  return (
    <div>
      <h2>Add Initiative or Position</h2>
      <form onSubmit={handleSubmit}>

    <label>Item ID:</label>
        <input type="number" name="itemid" value={formData.itemid} onChange={handleInputChange} required />

    <label>Item Name :</label>
        <input type="text" name="itemname" value={formData.itemname} onChange={handleInputChange} required />
    
        {itemtype == 'position' && ( 
       <div>
        <label>Number of Votes Allowed:</label>
        <input type="number" name="numvotesallowed" value={formData.numvotesallowed} onChange={handleInputChange} required />
        <label>Maximum number of candidates:</label>
        <input type="number" name="maxnumcandidates" value={formData.maxnumberofcandidates} onChange={handleInputChange} required />
       </div>
      )}
        <button type="submit">Create Ballot Item</button>
       
      </form>
      {itemtype == 'position' && ( 
      <button>Add Candidates to this Position</button>
      )}
      
    </div>
  );
}

export default AddBallotItemPage;
