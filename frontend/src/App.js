// import './App.css'
import Home from "./pages/memberhome";
import Login from "./components/Login";
import Results from "./pages/results";
import Status from "./pages/status";
import Voting from "./pages/voting";
import ADHome from "./pages/adhome";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import { useState } from "react";
import CreateUser from "./pages/createUser";
import CreateSociety from "./pages/createSociety";
import EditBallotPage from "./pages/createEditBallot";


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/memberhome" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/status" element={<Status />} />
          <Route path="/voting" element={<Voting />} />
          <Route path ="/societies" element={<ADHome/>}/>

          <Route path ="editBallot" element={<EditBallotPage/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
