// Quick Replies text.
import React, { Component } from 'react';
import BotImage from '../../images/bot.webp';
import QuickReplyButton from './QuickReplyButton';

export default class QuickReplies extends Component {
  handleClick = (event, payload, text) => {
    this.props.handleClick(event, payload, text);
  };

  /**
    "quick_replies": [
    {
      "text": "Yes",
      "payload": "quick_reply_recommend_movies_yes"
    },
    {
      "text": "No",
      "payload": "quick_reply_recommend_movies_no"
    }
  ]
}  
  */
  renderQuickReplies = (quickReplies) => {
    if (quickReplies) {
     return quickReplies.map((reply, i) => {
        return (
          <QuickReplyButton key={i} reply={reply} handleClick={this.handleClick} />
        )
      })
    }

    return null;
  };
  render() {
    return (
      <div className="message-wrapper wrap">
        {/* Quick Replies are always from a bot. So we don't need this. */}
        <img className="bot-image" src={BotImage} />
        <div className="message-bubble">{this.props.text.stringValue}</div>
        {/* Payload here means the quick_replies array. */}
        <div className="quick-reply-button-wrapper">
          {this.renderQuickReplies(this.props.payload)}
        </div>
        
      </div>
    );
  }
}
