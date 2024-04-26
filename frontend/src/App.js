// import './App.css'
import Home from "./pages/memberhome";
import Login from "./components/Login";
import Results from "./pages/results";
import Status from "./pages/status";
import Voting from "./pages/voting";
import AmericanDreamHome from "./components/AmericanDreamHome";
import Society from "./components/CreateSociety";
import User from "./components/CreateUser";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch
} from "react-router-dom";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/memberhome" element={<Home />} />
          <Route path="/AmericanDreamHome" element={<AmericanDreamHome />} />
          <Route path="/results" element={<Results />} />
          <Route path="/status" element={<Status />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/createSociety" element={<Society />} />
          <Route path="/createUser" element={<User />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
