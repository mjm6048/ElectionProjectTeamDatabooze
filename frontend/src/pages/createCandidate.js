import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
const BACKEND_URL ="http://localhost:5001";
function CreateCandidatePage(props) {
  const navigate = useNavigate();


  const token = localStorage.getItem('adtoken');
  
 
 
  const [formData, setFormData] = useState({
    description:'',
    titles:''
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
    const response =  await axios.post(`${BACKEND_URL}/candidates`,formData,{headers});
       
    if(response.status === 200)
    {
      alert("Candidate created");

    }
    }
catch(error)
  {
    console.error(error);
      
      if (error.response.status!=null && (error.response.status === 401 || error.response.status === 400))
      {
        alert("Candidate not created");
      }
        else
      { 
        alert("Internal server error");
    
      }
  }
  };

  return (
    <div>
      <h2>Create Candidate</h2>
      <form onSubmit={handleSubmit}>

    <label>Candidate ID:</label>
        <input type="number" name="candidateid" value={formData.itemid} onChange={handleInputChange} required />

    <label>First Name :</label>
        <input type="text" name="firstname" value={formData.itemname} onChange={handleInputChange} required />
    <label>Last Name :</label>
        <input type="text" name="lastname" value={formData.itemname} onChange={handleInputChange} required />
    <label>Titles :</label>
        <input type="text" name="titles" value={formData.itemname} onChange={handleInputChange} />
    <label>Description :</label>
        <input type="text" name="description" value={formData.itemname} onChange={handleInputChange}  />
    <label>Photo URL :</label>
        <input type="text" name="photo" value={formData.itemname} onChange={handleInputChange} required />
      
        <button type="submit">Create Ballot Item</button>
       
      </form>
      
      
    </div>
  );
}

export default CreateCandidatePage;