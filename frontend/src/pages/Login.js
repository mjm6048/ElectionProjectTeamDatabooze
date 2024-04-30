import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BACKEND_URL ="https://databooze.webdev.gccis.rit.edu:8001";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect( ()=>
  {

    const getBallots = async () =>
    {
      history("/memberhome");
    }
  
    if (localStorage.getItem("adtoken"))
    { var token= localStorage.getItem("adtoken");
      var decodedjwt = JSON.parse(atob(token.split(".")[1]));
      if(decodedjwt.exp*1000>Date.now())
      {
        localStorage.removeItem("adtoken");
        localStorage.removeItem("adusername");
        localStorage.removeItem("adroleid");
      }
      else{
        var uname = localStorage.getItem("adusername");
        setIsLoggedIn(true);
        getBallots();
      }
      
    }
  },[])

 
  async function submit(e) {
    e.preventDefault();
    try {
      let response = await axios.post(`${BACKEND_URL}/users/login`, {
          username,
          password
        });
        if (response.status === 200) {
          alert("Login successful");
          var ballots =[];
          if(response.data.roleid<3)
          {

            history("/memberhome");
      
          }
          else
          {
            history("/societies");
          }
            
          localStorage.setItem("adtoken",response.data.token);
          localStorage.setItem("adusername",username);
          localStorage.setItem("adroleid",response.data.roleid);
          setIsLoggedIn(true);

        } 
        else {
          alert("Invalid credentials");
        }
      
    }
    catch (error) {
      console.error(error);
      
      if (error.response.status!=null && error.response.status === 401)
      {
        alert("Invalid Credentials");
      }
        else
      { 
        alert("Internal server error");
    
      }
    }
  }

  return (
    <div style={styles.login}>
      <h1 style={styles.heading}>Login</h1>
      <form onSubmit={submit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          style={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={styles.input}
        />
        <input type="submit" value="Login" style={styles.submitButton} />
      </form>
    </div>
  );
}

const styles = {
  login: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9"
  },
  heading: {
    textAlign: "center"
  },
  input: {
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px"
  },
  submitButton: {
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    transition: "background-color 0.3s"
  }
};

export default Login;