import React from 'react';
import { Link } from 'react-router-dom';

import FactorStatus from '../components/FactorStatus';

class FactorGrid extends React.Component {
  render() {
    return (
      <div id="factor-grid" className="ui grid">
      <div className="four wide column">
        <FactorStatus
          score="63"
          factor="Air quality"
          colour_class="yellow-factor"
        />
      </div>
        <div className="four wide column">
          <FactorStatus
            score="22"
            factor="Light quality"
            colour_class="red-factor"
          />
        </div>
        <div className="four wide column">
          <FactorStatus
            score="53"
            factor="Noise quality"
            colour_class="yellow-factor"
          />
        </div>
        <div className="four wide column">
          <FactorStatus
            score="82"
            factor="Temperature"
            colour_class="green-factor"
          />
        </div>
      </div>
    );
  }
}

export default class Factors extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">
          <button id="back-button" className="circular ui icon huge button">
            <i className="arrow alternate left icon"></i>
          </button>
        </Link>
        <div id="content-container">
          <header id="graph-title">FRIDAY</header>
          <FactorGrid />
        </div>
      </div>
    );
  }
}
