import React from 'react';
import Login from './Auth/Login.js';
import LandingPage from './landingPage.js';
import {Router, Route, Redirect} from 'react-router-dom';
import history from './history.js';
function App() {
  return (
    <Router history= {history}>
    <Route path="/Login" component={Login} />
    <Route path="/LandingPage" component={LandingPage} />
    <Redirect from="/" to= "/Login" />
  </Router>
  );
}

export default App;
