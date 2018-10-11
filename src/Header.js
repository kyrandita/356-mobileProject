import React, { Component } from 'react';
import './Header.css';

class Header extends Component {

  render() {
    return (
      <header className="Header">
        <span>QuickChat</span>
        {this.props.room_code && <span>{this.props.room_code}</span>}
        <button onClick={this.action}>⚙</button>
      </header>
    );
  }

  action() {
    console.log('this would load the settings modal');
  }
}

export default Header;
