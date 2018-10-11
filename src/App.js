import React, { Component } from 'react';
import logo from './logo.svg';
import Header from './Header.js';
import Start from './Start.js';
import Chat from './Chat.js';
import Settings from './Settings.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        room_code: (new URLSearchParams(document.location.search).get('r')) || '',
        show: false,
        name: 'whitefox7',
        tempName: ''
    }
  }

  handleToggleSettings = () => {
    this.setState({ show: !this.state.show });
    // console.log('name: ', this.state.name);
    // console.log('tempName: ', this.state.tempName);
  };

  handleUsernameChange = () => {
      // console.log('name before submit button: ', this.state.name);
      // console.log('tempName submit button: ', this.state.tempName);
    this.setState(
        {
            name: this.state.tempName,
            tempName: '',
            show: !this.state.show
        }
        );
      // console.log('name after submit button: ', this.state.name);
  };

  handleChange = (n) => {
    // console.log('n.target.value: ', n.target.value);
    this.setState({ tempName: n.target.value });
    // console.log('name: ', this.state.name);
  };

  newSession = () => {
    //get random code either from firebase that doesn't yet exist, or generate new ones until an unused one is found
    this.setState({room_code: 'AB5X3'});
  }

  joinSession = (code) => {
    //TODO check code to see if room exists first
    this.setState({room_code: code});
  }

  clearSession = () => {
    this.setState({room_code: ""});
  }

  render() {
    return (
      <div className="App">
        <Header room_code={this.state.room_code} show={this.state.show} onClick={() => this.handleToggleSettings} clearSession={this.clearSession} />
        {
          this.state.room_code ?
          <Chat room_code={this.state.room_code} /> :
          <Start newSession={this.newSession} joinSession={this.joinSession}/>
        }

        <Settings
            show={this.state.show}
            tempName={this.state.tempName}
            onToggleSettings={() => this.handleToggleSettings}
            onChangeUsername={() => this.handleUsernameChange}
            onChange={() => this.handleChange}
        />
      </div>
    );
  }
}

export default App;
