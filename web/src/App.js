import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Home from './pages/Home';
import Factors from './pages/Factors';
import Feedback from './pages/Feedback';

const Body = () => (
  <Switch>
    {/* This is the app's main body, where the Home and Game components are injected */}
    <Route path="/" exact component={Home} />
    <Route path="/factors" component={Factors} />
    <Route path="/feedback" component={Feedback} />
    <Route render={() => <Redirect to={{ pathname: '/' }} />} />
  </Switch>
);

function App() {
  return (
    <div className="ui container">
      <Router>
        <Body />
      </Router>
    </div>
  );
}

export default App;
