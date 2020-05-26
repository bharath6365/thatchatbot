import React, { Component } from 'react';
import axios from 'axios';
import Message from './Message';
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';

const cookie = new Cookies();
export default class Chatbot extends Component {
  // Initially there will be nothing on the state.
  constructor(props) {
    super(props);
    // Invisible div to scroll to the end.
    this.messagesEnd = React.createRef();

    // Messages will be an array of conversation.
    this.state = {
      messages: []
    };

    // Generate new UUID. Only once per session.
    if (cookie.get('userID') === undefined) {
      cookie.set('userID', uuid(), {path: '/'});
    }
    
    this.userID = cookie.get('userID');
  }

  // When component mounts.
  async componentDidMount() {
    // Greet the user.
    this.eventQuery('Welcome');
  }

  // Used to pass text query
  async textQuery(text) {
    // Mirrors the API Response that is given by DialogFlow.
    let conversation = {
      speaks: 'me',
      msg: {
        text: {
          text
        }
      }
    };

    // This needs to be set to the state right away so that user can see what he has typed.
    this.setState({
      messages: [ ...this.state.messages, conversation ]
    });

    // Make the API Request.
    const res = await axios.post('/api/df_text_query', { text, userID: this.userID });

    for (let msg of res.data.fulfillmentMessages) {
      // Reset Conversation.
      let conversation = {
        speaks: 'bot',
        msg
      };

      // Setting the state in the loop. Probably not the best idea. But our bot will send 1 or 2 responses at max. Skipping for now.
      this.setState({
        messages: [ ...this.state.messages, conversation ]
      });
    }
    //
  }
  

  componentDidUpdate() {
    this.messagesEnd.current.scrollIntoView({
      behavior: 'smooth'
    })
  }

  // Used to pass event query.
  async eventQuery(event) {
    // Make the API Request.
    const res = await axios.post('/api/df_event_query', { event, userID: this.userID });

    for (let msg of res.data.fulfillmentMessages) {
      let conversation = {
        speaks: 'bot',
        msg
      };

      this.setState({
        messages: [ ...this.state.messages, conversation ]
      });
    }
  }

  // Handles input event change.
  handleInputChange = (event) => {
    if (event.key === 'Enter') {
      this.textQuery(event.target.value);

      event.target.value = '';
    }
  };

  renderMessages = () => {
    const { messages } = this.state;

    console.log('Messages is', messages);

    return messages.map((message, i) => {
      return (
        // Key can be index because we won't be removing array elements at all.
        <Message key={i} initiator={message.speaks} message={message.msg.text.text} />
      );
    });
  };

  // Render method.
  render() {
    return (
      <div
        style={{
          height: 400,
          width: 400,
          float: 'right'
        }}
      >
        <div
          id="chatbot"
          style={{
            overflow: 'auto',
            height: '100%',
            width: '100%'
          }}
        >
          <h2>Chatbot</h2>
          {this.renderMessages()}

          <div 
            ref={this.messagesEnd}
          ></div>
          <input autoFocus={true} onKeyPress={this.handleInputChange} type="text" />
        </div>
      </div>
    );
  }
}
