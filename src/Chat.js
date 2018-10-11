import React, { Component } from 'react';
import av1 from './male-avatar.jpg';
import av2 from './male-avatar2.jpg';
import './Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatLog: [
        {
          msg: "Hey, we just finished with our part of the project, are you guys ready?",
          id: "WhiteFox7",
          icon: 1,
        },
        {
          msg: "We'll be done in a few minutes... should we meet you guys at the café?",
          id: "PurpleZebra88",
          icon: 2,
        },
        {
          msg: "sounds good, see you there",
          id: "WhiteFox7",
          icon: 1,
        },
      ]
    };
  }

  render() {
    return (
      <div className="Chat">
        <div className="message">
          <span>Hey, we just finished with our part of the project, are you guys ready?</span>
          <div>
            <img src={av1} alt="WhiteFox7" />
            <span>WhiteFox7</span>
          </div>
        </div>
        <div className="message">
          <div>
            <img src={av2} alt="PurpleZebra88" />
            <span>PurpleZebra88</span>
          </div>
          <span>We'll be done in a few minutes... should we meet you guys at the café?</span>
        </div>
        <div className="message">
          <span>sounds good, see you there</span>
          <div>
            <img src={av1} alt="WhiteFox7" />
            <span>WhiteFox7</span>
          </div>
        </div>
        <footer className="chat-footer">
          <textarea></textarea>
          <button className="action-primary">Send</button>
        </footer>
      </div>
    );
  }
}

export default Chat;
