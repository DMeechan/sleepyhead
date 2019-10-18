import React from 'react';
import { Link } from 'react-router-dom';

import '../index.css';

export default class FactorStatus extends React.Component {
    render() {
        return <div id="factor-status" className={this.props.colour_class}>
            <div id="factor-status-score"><Link to="/feedback">{this.props.score}%</Link></div><br/>
            <Link to="/feedback">{this.props.factor}</Link>
        </div>;
    }
}
