import React, {Component} from 'react';
import Message from './Message.js';
import './Chat.css';
import firebase from './firebase';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // chatLog: [
      //   {
      //     msg: "Hey, we just finished with our part of the project, are you guys ready?",
      //     id: "WhiteFox7",
      //     icon: 1
      //   }, {
      //     msg: "We'll be done in a few minutes... should we meet you guys at the café?",
      //     id: "PurpleZebra88",
      //     icon: 2
      //   }, {
      //     msg: "sounds good, see you there",
      //     id: "WhiteFox7",
      //     icon: 1
      //   }
      // ],
        chatLog: {},
        newMessage: ""
    };
    this.typing = this.typing.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.onEnterPress = this.onEnterPress.bind(this);
    this.getMessagesFromFirebase();
    this.syncFirebase();
  }

  render() {
    return (<div className="Chat">
      <div className='chatLog' ref='chatLog'>
      {
        Object.keys(this.state.chatLog).map((key, index) => <Message message = {this.state.chatLog[key]}
        self = {
          this.state.chatLog[key].id === this.props.name
        }
        key = {
          index
        } > </Message>)
      }
      </div>
      <footer className="chat-footer">
        <textarea onChange={this.typing} onKeyDown={this.onEnterPress} value={this.state.newMessage} placeholder="Get chatting!"></textarea>
        <span>Enter to send</span>
      </footer>
    </div>);
  }

  syncFirebase () {
      this.intervalId = setInterval(() => {
          this.getMessagesFromFirebase();
      }, 5000);
  }

  componentWillUnmount() {
      clearInterval(this.intervalId);
  }

  getMessagesFromFirebase() {
      const messagesRef = firebase.database().ref(`${this.props.room_code}/chat-log`);
      // console.log('messagesRef: ', messagesRef);

      messagesRef.on('value', (snapshot) => {
          // console.log('snapshot.val(): ', snapshot.val());
          this.setState({chatLog: snapshot.val()});
          // console.log('chatLog: ', this.state.chatLog);
      });
  }

  componentDidUpdate(oldProps, oldState) {
    this.refs.chatLog.scrollTo(0,this.refs.chatLog.scrollHeight);
  }

  typing(event) {
    this.setState({newMessage: event.target.value});
  }

  sendMessage(event) {
      // console.log('this.state.chatLog: ', this.state.chatLog);
      const messagesRef = firebase.database().ref(`${this.props.room_code}/chat-log`);
      let message = {
          msg: this.state.newMessage,
          id: this.props.name,
          icon: this.props.icon
      };

      messagesRef.push(message).then(

      );

    this.setState({
      newMessage: ''
    });
  }

  onEnterPress(event) {
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      this.sendMessage(event);
    }
  }
}

export default Chat;
