import logo from './logo.svg';
import { useState, useEffect, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Router,
  Route,
  Switch
} from "react-router-dom";
import Homepage from './components/Homepage';
import Userpage from './components/Userpage';
import CRApage from './components/CRApage';
import Overviewpage from './components/Overviewpage';
import Login from "./components/Login.jsx"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Homepage />
        </Route>
        <Route path="/user">
          <Userpage />
        </Route>
        <Route path="/cra">
          <CRApage />
        </Route>
        <Route path="/overview">
          <Overviewpage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
