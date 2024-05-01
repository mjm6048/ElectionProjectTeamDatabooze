import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
const BACKEND_URL ="http://localhost:5001";
function CreateUser(props) {
  const navigate = useNavigate();
  const { state } = useLocation();

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
  });



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    console.log(formData);
    try
    {
    const response =  await axios.post(`${BACKEND_URL}/users/${formData.username}`,formData,{headers});
       
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
      <h2>Create or Edit User</h2>
      <form onSubmit={handleSubmit}>
      <label>Username:</label>
<input type="text" name="username" value={formData.username} onChange={handleInputChange} required />

<label>First Name:</label>
<input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />

<label>Last Name:</label>
<input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />

<label>Password:</label>
<input type="password" name="password" value={formData.password} onChange={handleInputChange} required />

<label>Society IDs:</label>
<input type="text" name="societyIDs" value={formData.societyIDs} onChange={handleInputChange} required />

<label>Role ID:</label>
<input type="text" name="roleID" value={formData.roleID} onChange={handleInputChange} required />


        <button type="submit">Save Changes</button>
       
      </form>
    </div>
  );
}

export default CreateUser;