import React from 'react';
import BotImage from '../../images/bot.webp';
import UserImage from '../../images/user.png';

// Just used for rendering text messages.
export default function Message({ initiator, message }) {
  return (
    <div>
      {initiator === 'bot' && (
        <div className="message-wrapper">
          <img className="bot-image" src={BotImage} />
          <div className="message-bubble">{message}</div>
        </div>
      )}

      {initiator === 'me' && (
        <div className="message-wrapper user">
          <div className="message-bubble">{message}</div>
          <img className="bot-image" src={UserImage} />
        </div>
      )}
    </div>
  );
}
