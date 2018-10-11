import React, { Component } from 'react';
import './Start.css';

class Start extends Component {
  constructor(props) {
    super(props);
    this.joinSession = this.joinSession.bind(this);
    this.state = {
      join_code: ""
    };
  }

  render() {
    return (
      <div className="Start">
        <button className="action-primary" onClick={this.props.newSession}>New Session</button>
        <div>
          <input type="text" maxLength="5" placeholder="Session Code" value={this.state.join_code} onChange={this.handleChange} />
          <button className="action-secondary" onClick={this.joinSession}>Join</button>
        </div>
      </div>
    );
  }

  handleChange = (n) => {
    // console.log('n.target.value: ', n.target.value);
    this.setState({ join_code: n.target.value });
    // console.log('name: ', this.state.name);
  };

  joinSession() {
    this.props.joinSession(this.state.join_code);
  }
}

export default Start;
