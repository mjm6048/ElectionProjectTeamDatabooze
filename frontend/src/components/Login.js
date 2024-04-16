import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
     await axios.post("https://databooze-dev.webdev.gccis.rit.edu/users/login", {
        username,
        password
      })
      .then(response=>{
      if (response.status === 200) {
        alert("Login successful");
        
        // Redirect to home page or do any further actions upon successful login
      } else {
        console.log(response.status);
        alert("Invalid credentials");
      }
    })
    } catch (error) {
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
