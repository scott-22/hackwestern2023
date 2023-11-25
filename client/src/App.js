import logo from './logo.svg';
import { useState, useEffect, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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
      </Switch>
    </Router>
  );
}

export default App;
