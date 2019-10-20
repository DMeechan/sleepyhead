import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Footer from './components/Footer'

import { PrivateRoute } from './auth/PrivateRoute';
import Login from './pages/Login';
import Overview from './pages/Overview';
import Factors from './pages/Factors';
import Feedback from './pages/Feedback';

const Body = () => (
  <Switch>
    {/* This is the app's main body, where the Home and Game components are injected */}
    <Route path="/login" exact component={Login} />
    <PrivateRoute path="/" exact component={Overview} />
    <PrivateRoute path="/factors" component={Factors} />
    <PrivateRoute path="/feedback" component={Feedback} />
    <Route render={() => <Redirect to={{ pathname: '/' }} />} />
  </Switch>
);

function App() {

  return (
    <div className="ui container">
      <Router>
        <Body />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
