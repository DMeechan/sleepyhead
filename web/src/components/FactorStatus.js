import React from 'react';
import { Link } from 'react-router-dom';

import '../index.css';

export default class FactorStatus extends React.Component {
    render() {
        return <div id="factor-status" className={this.props.colour_class}>
            <Link to="/feedback">
                <div id="factor-status-score">{this.props.score}%</div><br/>
                {this.props.factor}
            </Link>
        </div>;
    }
}
