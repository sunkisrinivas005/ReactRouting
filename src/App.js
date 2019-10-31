import React from 'react';
import Login from './Login.js';
import Register from './Register.js';
import LandingPage from './landingPage.js';
import {Router, Route} from 'react-router-dom';
import history from './history.js';
import ForgotPassword from './forgotPassword';
function App() {
  return (
    <Router history= {history}>
    <Route path="/Login" component={Login} />
    <Route path="/Register" component={Register} />
    <Route path="/landingPage" component={LandingPage} />
    <Route path ='/ForgotPassword' component = {ForgotPassword} />
  </Router>
  );
}

export default App;
