import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

function EditBallotPage(props) {

  const { state } = useLocation(); 
  const token = localStorage.getItem('adtoken');
  const ballotid = state.ballotid;
  const [formData, setFormData] = useState({
    ballotName: '',
    startDate: '',
    endDate: ''
  });


  useEffect(() => {
    async function fetchBallotData() {
      try {
       
        // Fetch existing ballot data from the backend API
        const response = await fetch(`http://localhost:5001/ballot?ballotID=${ballotid}`,{ headers: {"Authorization" : `Bearer ${token}`} });

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
          societyid: data[0].societyid
        });
        console.log(formData);
      } catch (error) {
        console.error('Error fetching ballot:', error);
        // Handle error, e.g., redirect to error page
      }
    }
    fetchBallotData();
  }, [ballotid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    
  };

  return (
    <div>
      <h2>Edit Ballot</h2>
      <form onSubmit={handleSubmit}>
        <label>Ballot Name:</label>
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
