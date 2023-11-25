import logo from './logo.svg';
import { useState, useEffect, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Homepage from './components/Homepage';
import Userpage from './components/Userpage';
import CRApage from './components/CRApage';
import Overviewpage from './components/Overviewpage';

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
      </Switch>
    </Router>
  );
}

export default App;
