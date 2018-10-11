import React from 'react';
import av0 from './female-avatar1.jpg';
import av1 from './male-avatar.jpg';
import av2 from './male-avatar2.jpg';
import './Message.css';

const avatars = [av0,av1,av2];
export default (props) => {
  return (
    <div className={"Message " + (props.self ? 'self' : '')} >
      <div>
        <img src={avatars[props.message.icon]} alt="WhiteFox7" />
        <span>{props.message.id}</span>
      </div>
      <span>{props.message.msg}</span>
    </div>
  )
};
