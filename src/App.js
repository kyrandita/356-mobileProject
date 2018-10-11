import React, { Component } from 'react';
import logo from './logo.svg';
import Header from './Header.js';
import Start from './Start.js';
import Chat from './Chat.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {room_code: (new URLSearchParams(document.location.search).get('r')) || ''}
  }

  render() {
    return (
      <div className="App">
        <Header room_code={this.state.room_code}></Header>
        {
          this.state.room_code ?
          <Chat room_code={this.state.room_code}></Chat> :
          <Start room_code={this.state.room_code}></Start>
        }
      </div>
    );
  }
}

export default App;
