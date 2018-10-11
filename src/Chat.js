import React, {Component} from 'react';
import Message from './Message.js';
import './Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatLog: [
        {
          msg: "Hey, we just finished with our part of the project, are you guys ready?",
          id: "WhiteFox7",
          icon: 1
        }, {
          msg: "We'll be done in a few minutes... should we meet you guys at the café?",
          id: "PurpleZebra88",
          icon: 2
        }, {
          msg: "sounds good, see you there",
          id: "WhiteFox7",
          icon: 1
        }
      ],
      newMessage: ""
    };
    this.typing = this.typing.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.onEnterPress = this.onEnterPress.bind(this);
  }

  render() {
    return (<div className="Chat">
      <div className='chatLog' ref='chatLog'>
      {
        this.state.chatLog.map((item, index) => <Message message = {item}
        self = {
          item.id === this.props.name
        }
        key = {
          index
        } > </Message>)
      }
      </div>
      <footer className="chat-footer">
        <textarea onChange={this.typing} onKeyDown={this.onEnterPress} value={this.state.newMessage}></textarea>
        <button className="action-primary" onClick={this.sendMessage}>Send</button>
      </footer>
    </div>);
  }

  componentDidUpdate(oldProps, oldState) {
    this.refs.chatLog.scrollTo(0,this.refs.chatLog.scrollHeight);
  }

  typing(event) {
    this.setState({newMessage: event.target.value});
  }

  sendMessage(event) {
    this.setState({
      chatLog: this.state.chatLog.concat({msg: this.state.newMessage, id: this.props.name, icon: 0}),
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
