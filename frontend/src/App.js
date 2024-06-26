// import './App.css'
import Home from "./pages/memberhome";
import Login from "./pages/Login";
import Results from "./pages/results";
import Status from "./pages/status";
import Voting from "./pages/voting";
import ADHome from "./pages/adhome";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import { useState } from "react";
import CreateUser from "./pages/createUser";
import CreateSociety from "./pages/createSociety";
import EditBallotPage from "./pages/createEditBallot";
import AddBallotItemPage from "./pages/addBallotItem";
import CreateCandidatePage from "./pages/createCandidate";
import SocietyStatistics from "./pages/SocietyStatistics";
import SystemStatistics from "./pages/SystemStatistics";
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
          <Route path ="/createCandidate" element={<CreateCandidatePage/>}/>
          <Route path ="/editBallot" element={<EditBallotPage/>}/>
          <Route path ="/addBallotItem" element={<AddBallotItemPage/>}/>
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/createSociety" element={<CreateSociety />} />
          <Route path="/societyStatistics" element={<SocietyStatistics />} />
          <Route path="/systemStatistics" element={<SystemStatistics />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
