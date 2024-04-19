// import './App.css'
import Home from "./components/Home";
import Login from "./components/Login";
import SystemStatistics from "./components/SystemStatistics";
import SocietyStatistics from "./components/SocietyStatistics";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/systemstatistics" element={<SystemStatistics />} />
          <Route path="/societystatistics" element={<SocietyStatistics />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
