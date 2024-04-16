import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
function MemberHome(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state.username);
  const username = state.username;
  const token = localStorage.getItem('adtoken');
  

  return (
    <div>
      <h2>Home</h2>


    
    </div>
  );
}

export default MemberHome;
