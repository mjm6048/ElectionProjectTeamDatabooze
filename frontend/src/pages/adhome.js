
import React, { useEffect, useState } from "react";
import Ballot from "../components/ballot";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import '../index.css';
const BACKEND_URL ="https://databooze.webdev.gccis.rit.edu:8001";

function ADHome(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [societies,setSocieties]=useState([]);
  const roleId = localStorage.getItem('adroleid');
  console.log(roleId);

  useEffect( ()=>
  {
  
    if (localStorage.getItem("adtoken"))
    {
       getSocieties();
    }

  },[])
  
  const getSocieties = async () =>
  {
    var token= localStorage.getItem("adtoken");
    var res = await axios.get(`${BACKEND_URL}/societies`,{ headers: {"Authorization" : `Bearer ${token}`} });
    console.log(res.data);
    setSocieties(Object.values(res.data));
  }
  console.log(societies);
  const token = localStorage.getItem('adtoken');


 
  const handleView = async (societyID) => {
    try {
      navigate('/memberhome', {state: { society: societyID }});
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };


  return (
    <div>
      <h2>Home</h2>
      {/* Conditionally render buttons based on role ID */}
      {roleId == 4 && (
        <div>
          <button onClick={()=>navigate("/createUser")}>Create User</button>
          <button onClick={()=>navigate("/createSociety")}>Create Society</button>
          <button onClick={()=>navigate("/SystemStatistics")}>View System Statistics</button>
          <button onClick={()=>navigate("/SocietyStatistics")}>View Society Statistics</button>
        </div>
      )}
  
      <div>
        <h2>Societies</h2>
        {societies.map((society) => {
          return (
            <div className="society-container" key={society.societyID}>
              <div>
                <h3>{society.societyname}</h3>
                <h4>{society.societydescription}</h4>
              </div>
              <button className="society-button" onClick={() => handleView(society.societyID)}>View</button>
            </div>
          );
        })}
      </div>
    </div>
  );
  
}

export default ADHome;
