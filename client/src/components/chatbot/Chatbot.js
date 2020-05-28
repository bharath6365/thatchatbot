import React, { Component } from 'react';
import axios from 'axios';
import Message from './Message';
import Cookies from 'universal-cookie';
import Card from './Card';
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
      messages: [],
      inputValue: ''
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
    
    // User abusing enter key.
    if (!text) return;
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
    
    if (!event) return;
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
    this.setState({
      inputValue: event.target.value
    })
  };

// Form Submission
  handleSubmit = (event) => {
    event.preventDefault();
    const inputValue = this.state.inputValue;
    console.log('Calling text query', inputValue);
    if (inputValue) {
      this.textQuery(inputValue);
    }
    
    //Reset.
    this.setState({
      inputValue: ''
    })
  }

  renderMessages = () => {
    const { messages } = this.state;


    return messages.map((message, i) => {
      if (message.msg?.text?.text) {
       return <Message key={i} initiator={message.speaks} message={message.msg.text.text} />
      } else if (message.msg?.payload?.fields?.cards) {
        return <div key={i}>
          <div className="card-panel grey lighten-5 z-depth-1">
            <div style={{overflow: 'hidden'}}>
              <a className="btn-floating btn-large waves-effect waves-light red">
                <i class="material-icons">{message.speaks}</i>
              </a>
            </div>

            <div style={{overflow: 'auto', overflowY: 'scroll'}}>
              <div style={{height: 300, width: message.msg.payload.fields.cards.listValue.values.length * 270}}>
                {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
              </div>
            </div>
          </div>
        </div>
      }
    });
  };

  renderCards = (cards) => {
    return cards.map((card, i) => <Card key={i} payload={card.structValue} />)
  }

  // Render method.
  render() {
    return (
      <div className="chatbot"
      >
        <div
          className="chatbot-inner"
        >
          <div className="chatbot-header">
            Bharath's Bot

            <div className="chatbot-toggle">
              <i className="material-icons">close</i>
            </div>
          </div>

          <div className="chatbot-body">
            {this.renderMessages()}
          </div>
          

          <div 
            ref={this.messagesEnd}
          ></div>
          <form onSubmit={this.handleSubmit}>
            <input className="chat-input" autoFocus={true} type="text" onChange={this.handleInputChange} value={this.state.inputValue} placeholder="Send your messsage"/>

            <button type="submit" className="chat-submit">
              <i class="material-icons">send</i>
            </button>
          </form>
          
        </div>
      </div>
    );
  }
}
