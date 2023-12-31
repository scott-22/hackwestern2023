import logo from './logo.svg';
import { useState, useEffect, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Homepage from './components/Homepage';
import Userpage from './components/Userpage';
import CRApage from './components/CRApage';
import Overviewpage from './components/Overviewpage';
import Login from "./components/Login.jsx"

function App() {
  return (
    <Router>
      <Link to="/" className='p-4 text-xl block font-bold text-blue-600 hover:text-blue-400'>Home</Link>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/user" element={<Userpage />} />
        
        <Route path="/cra" element={<CRApage />} />
        
        <Route path="/overview" element={<Overviewpage />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
