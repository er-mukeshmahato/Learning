import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteStates from "./context/notes/NoteStates";


function App() {
  return (
    
      <NoteStates>
          <Router>
          <Navbar />
          <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
          </div>
          
          </Router>
      </NoteStates>
        
     
    
  );
}

export default App;
