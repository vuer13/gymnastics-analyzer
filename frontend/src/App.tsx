import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar.tsx'
import Home from './pages/Home.tsx'
import Upload from './pages/Upload.tsx'
import ComparePick from './pages/ComparePick.tsx';

function App() {
  return (
    <Router>
        <div className="App">
            <header className="App-header">
                <Navbar/>
                <Routes>
                    <Route path="/" element = <Home /> />
                    <Route path='upload' element=<Upload/> />
                    <Route path='pick' element=<ComparePick/> />
                </Routes>
            </header>
        </div>
    </Router>
  );
}

export default App;
