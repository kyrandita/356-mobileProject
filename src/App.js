import React, { Component } from 'react';
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
        tempName: 'whitefox7',
        theme: 'dark',
        installable: false
    }
    //TODO bind beforeInstallPrompt event, store, show minimal user interface, allow install
  }

  handleToggleSettings = () => {
    this.setState({ show: !this.state.show });
    // console.log('name: ', this.state.name);
    // console.log('tempName: ', this.state.tempName);
  };

  handleUsernameChange = () => {
      // console.log('name before submit button: ', this.state.name);
      // console.log('tempName submit button: ', this.state.tempName);
    this.setState({name: this.state.tempName});
      // console.log('name after submit button: ', this.state.name);
  };

  handleThemeChange = () => {
      // Actually change theme here
  };

  handleChange = (n) => {
    // console.log('n.target.value: ', n.target.value);
    this.setState({ tempName: n.target.value });
    // console.log('name: ', this.state.name);
  };

  handleChange2 = (n) => {
      console.log('selected theme: ', n.target.value);

      this.setState({theme: n.target.value});
  };

  newSession = () => {
    //get random code either from firebase that doesn't yet exist, or generate new ones until an unused one is found
    this.setState({room_code: 'AB5X3'});
  };

  joinSession = (code) => {
    //TODO check code to see if room exists first
    this.setState({room_code: code});
  };

  clearSession = () => {
    this.setState({room_code: ""});
  };

  beforeInstallPrompt = (e) => {
    e.preventDefault();
    this.installEvent = e;
    this.setState({installable: true});
  }

  promptInstall = () => {
    this.installEvent.prompt();
  }

  render() {
    return (
      <div className={`App ${this.state.theme}`}>
        <Header room_code={this.state.room_code} show={this.state.show} onClick={() => this.handleToggleSettings} clearSession={this.clearSession} />
        {
          this.state.room_code ?
          <Chat room_code={this.state.room_code} name={this.state.name}/> :
          <Start newSession={this.newSession} joinSession={this.joinSession}/>
        }
        {
          this.state.installable &&
          <div>Add Shortuct to your homescreen? <button onClick={this.promptInstall}>ADD</button></div>
        }

        <Settings
            show={this.state.show}
            name={this.state.name}
            tempName={this.state.tempName}
            theme={this.state.theme}
            onToggleSettings={() => this.handleToggleSettings}
            onChangeUsername={() => this.handleUsernameChange()}
            onChangeTheme={() => this.handleThemeChange}
            onChange={() => this.handleChange}
            onChange2={() => this.handleChange2}
        />
      </div>
    );
  }
}

export default App;
