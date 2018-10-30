import React, { Component } from 'react';
import Header from './Header.js';
import Start from './Start.js';
import Chat from './Chat.js';
import Settings from './Settings.js';
import './App.css';
import firebase from './firebase';

class App extends Component {
  constructor(props) {
    super(props);
    let name = this.randomizeName();
    this.state = {
        room_code: (new URLSearchParams(document.location.search).get('r')) || '',
        show: false,
        name: name,
        tempName: name,
        theme: 'dark',
        installable: false,
        icon: Math.floor(Math.random() * 3)
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

  randomizeName = () => {
      let colors = ['red', 'blue', 'green', 'yellow', 'purple', 'white', 'pink', 'amaranth', 'amber', 'azure', 'blush', 'brown', 'burgundy', 'bronze', 'magenta', 'lime', 'orange', 'scarlet', 'sapphire', 'silver'];
      // Math.floor(Math.random() * 100);
      let animals = ['fox', 'zebra', 'elephant', 'horse', 'giraffe', 'mongoose', 'bird', 'cow', 'dog', 'cat', 'pig', 'raccoon', 'ferret', 'rabbit', 'badger', 'wolverine', 'weasel', 'sloth', 'slug'];

      return colors[Math.floor(Math.random() * colors.length)] + animals[Math.floor(Math.random() * animals.length)] + Math.floor(Math.random() * 100).toString();
  };

    makeId = () => {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (let i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    };

  newSession = () => {
    //get random code either from firebase that doesn't yet exist, or generate new ones until an unused one is found

      const getAllSessions = firebase.database().ref();

      getAllSessions.once('value', (snapshot) => {
          // if (snapshot.key)
          let newSessionCode;
          console.log(snapshot.hasChild('asdf'));

          do {
              newSessionCode = this.makeId();
          } while (snapshot.hasChild(newSessionCode));

          getAllSessions.child(newSessionCode).set({
              'chat-log': [{
                  msg: "Welcome to your new session! Please give the code above to other participants, and follow safe online chat practices (if you don't know what those are, go ask your parents!).",
                  id: 'Chat Bot',
                  icon: 1
              }],
              'created-at': (new Date()).toISOString()
          });

          this.setState({room_code: newSessionCode});
      });
  };

  joinSession = (code) => {
    //TODO check code to see if room exists first

      const checkIfSessionExists = firebase.database().ref(code);
      checkIfSessionExists.once('value', (snapshot) => {
          // console.log('snapshot 1123: ', snapshot.val());

          if (snapshot.val()) {
              this.setState({room_code: code});
          } else {
              alert('That chat room does not exist. Please verify that your session code is correct.');
          }
      });
      // console.log('test: ', test);
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
          <Chat
              room_code={this.state.room_code}
              name={this.state.name}
              icon={this.state.icon}
          /> :
          <Start
              newSession={this.newSession}
              joinSession={this.joinSession}
          />
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
