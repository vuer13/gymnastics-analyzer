import React from 'react';
import { BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar.tsx'

function App() {
  return (
    <Router>
        <div className="App">
            <header className="App-header">
                <Navbar/>
                <Routes>

                </Routes>
            </header>
        </div>
    </Router>
  );
}

export default App;
