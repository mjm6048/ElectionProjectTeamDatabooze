// import './App.css'
import Home from "./pages/memberhome";
import Login from "./components/Login";
import Results from "./pages/results";
import Voting from "./pages/voting";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import { useState } from "react";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/memberhome" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/voting" element={<Voting />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
