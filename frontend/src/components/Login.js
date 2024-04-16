import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";




// function HandleLoggedIn()
// { 
//   const history = useNavigate();
//   var uname = localStorage.getItem("adusername");
//   history("/memberhome")
// }

// window.onload =()=>
// {
//   if (localStorage.getItem("adtoken"))
//   { 
//     HandleLoggedin();
//   }
  
// }



function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>
  {
    if (localStorage.getItem("adtoken"))
    {
      var uname = localStorage.getItem("adusername");
      console.log(uname);
      history("/memberhome",{state: { username: uname}} )
    }
  },[])
 
  async function submit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/users/login", {
          username,
          password
        })
        .then(response=>{
        if (response.status === 200) {
          alert("Login successful");
          history("/memberhome",{state:{username:username}})
          localStorage.setItem("adtoken",JSON.stringify(response.data.token));
          localStorage.setItem("adusername",username);
          setIsLoggedIn(true);
          // Redirect to home page or do any further actions upon successful login
        } else {
          console.log(response.status);
          alert("Invalid credentials");
        }
      })
    }

    catch (error) {
      console.error(error);
      if (error.response.status === 401)
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
