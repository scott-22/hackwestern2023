import logo from './logo.svg';
import { useState, useEffect, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from "./components/Login.jsx"

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </Router>
  );
}

export default App;
