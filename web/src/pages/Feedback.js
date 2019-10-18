import React from 'react';
import { Link } from 'react-router-dom';

export default class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Link to="/factors">
          <button id="back-button" class="circular ui icon huge button">
            <i class="arrow alternate left icon"></i>
          </button>
        </Link>
        <div id="content-container">
          <header id="bar-graph-title">SOME DAY: SOME FACTOR</header>
        </div>
      </div>
    );
  }
}
