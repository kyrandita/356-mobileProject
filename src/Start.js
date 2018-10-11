import React, { Component } from 'react';
import './Start.css';

class Start extends Component {
  render() {
    return (
      <div className="Start">
        <button className="action-primary">New Session</button>
        <div>
          <input id="join-code" type="text" maxLength="5" placeholder="Session Code" />
          <button className="action-secondary">Join</button>
        </div>
      </div>
    );
  }
}

export default Start;
