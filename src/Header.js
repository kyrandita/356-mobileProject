import React, { Component } from 'react';
import './Header.css';

class Header extends Component {

  render() {
    return (
      <header className="Header">
        {
          this.props.room_code ?
          <span onClick={this.props.clearSession}>&lt;</span> :
          <span>QuickChat</span>
        }
        {this.props.room_code && <span>{this.props.room_code}</span>}
        <button onClick={this.props.onClick()}>⚙</button>
      </header>
    );
  }
}

export default Header;
