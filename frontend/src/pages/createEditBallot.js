import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import getAverageResponseTime from "../utils/getAverageResponseTime";
const BACKEND_URL ="http://localhost:5001";

function EditBallotPage(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { measuredAxios } = getAverageResponseTime();
  const token = localStorage.getItem('adtoken');
  if(state!=null)
  {
     var ballotid = state.ballotid;
  }
  
  else 
  { 
    ballotid = 0;
  }
  const [formData, setFormData] = useState({
    ballotName: '',
    startDate: '',
    endDate: ''
  });


  useEffect(() => {

    async function fetchBallotData() {
      try {
       
        // Fetch existing ballot data from the backend API
        const response = await fetch(`${BACKEND_URL}/ballot?ballotID=${ballotid}`,{ headers: {"Authorization" : `Bearer ${token}`} });

        if (!response.ok) {
          throw new Error('Failed to fetch ballot');
        }
        const data = await response.json();
        console.log(typeof data[0].ballotname);
        const startdate = new Date(data[0].startdate);
        const enddate = new Date(data[0].enddate);
        console.log(startdate.toISOString().split('T')[0].replace(/-/g, '-'));
        // Populate form fields with existing ballot data

        setFormData({
          ballotname: data[0].ballotname,
          startdate: startdate.toISOString().split('T')[0].replace(/-/g, '-'),
          enddate:  enddate.toISOString().split('T')[0].replace(/-/g, '-'),
          societyid: data[0].societyid,
          ballotid:ballotid, 
          edit:true
        });
        console.log(formData);
      } catch (error) {
        console.error('Error fetching ballot:', error);
        // Handle error, e.g., redirect to error page
      }
    }
    if(ballotid!=0)
    {
        fetchBallotData();
       
    }
    else
    {
        setFormData({
            edit:false
          });
    }
  }, [ballotid]);

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
    const response =  await measuredAxios.post(`${BACKEND_URL}/ballots`,formData,{headers});
       
    if(response.status === 200)
    {
      alert("Ballot created/edited");
      navigate("/memberhome");

    }
    }
    catch(error)
    {
        console.error(error);
        
        if (error.response.status!=null && (error.response.status === 401 || error.response.status === 400))
        {
            alert("ballot not edited/created");
        }
            else
        { 
            alert("Internal server error");
        
        }
    }
  };

  return (
    <div>
      <h2>Create or Edit Ballot</h2>
      <form onSubmit={handleSubmit}>
      {ballotid === 0 && (
        <>
          <label>Ballot ID:</label>
          <input
            type="text"
            name="ballotid"
            value={formData.ballotid}
            onChange={handleInputChange}
            required
          />
        </>
      )}
  <label>Ballot Name :</label>
        <input type="text" name="ballotname" value={formData.ballotname} onChange={handleInputChange} required />
        
        <label>Start Date:</label>
        <input type="date" name="startdate" value={formData.startdate} onChange={handleInputChange} required />
        
        <label>End Date:</label>
        <input type="date" name="enddate" value={formData.enddate} onChange={handleInputChange} required />
        <label>Society ID:</label>
        <input type="number" name="societyid" value={formData.societyid} onChange={handleInputChange} required />

        <button type="submit">Save Changes</button>
       
      </form>
    </div>
  );
}

export default EditBallotPage;
