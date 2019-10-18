import React from 'react';
import { Link } from 'react-router-dom';

import Content from '../components/Content';
import FactorStatus from '../components/FactorStatus';

class FactorGrid extends React.Component {
    render() {
        return <div id="factor-grid" className="ui grid">
            <div className="four wide column">
                <FactorStatus score="30" factor="Temperature" colour_class="red-factor" />
            </div>
            <div className="four wide column">
                <FactorStatus score="75" factor="Factor 2" colour_class="green-factor" />
            </div>
            <div className="four wide column">
                <FactorStatus score="75" factor="Factor 3" colour_class="yellow-factor" />
            </div>
            <div className="four wide column">
                <FactorStatus score="75" factor="Factor 4" colour_class="green-factor" />
            </div>
        </div>
    }
}

export default class Factors extends React.Component {
  render() {
    return <div id="content-container">
        <FactorGrid />
    </div>;
  }
}
