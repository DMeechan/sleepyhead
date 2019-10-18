import React from 'react';
import { Link } from 'react-router-dom';

import FactorGraph from '../components/FactorGraph';
import FeedbackPane from '../components/FeedbackPane';

class BigScore extends React.Component {
    render() {
        return <p>x%</p>
    }
}

export default class Feedback extends React.Component {
  render() {
    return <div id="content-container">
        <header id="bar-graph-title">SOME DAY: SOME FACTOR</header>
        <div id="padded-top-grid" className="ui grid">
            <div className="ten wide column">
                <BigScore />
                <FactorGraph />
            </div>
            <div className="six wide column">
                <FeedbackPane />
            </div>
        </div>
    </div>;

  }
}
