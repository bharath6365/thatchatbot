import React, { Component } from 'react';
import axios from 'axios';
import Message from './Message';
import Cookies from 'universal-cookie';
import Card from './Card';
import Recommendation from './Recommendation';
import QuickReplies from './QuickReplies';
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
      inputValue: '',
      // Chatbot open/close.
      opened: false
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
        msg,
        // Pass this on so that we can listen for "Recommend Channels intent name."
        parameters: res.data.parameters?.fields
      };

      // Setting the state in the loop. Probably not the best idea. But our bot will send 1 or 2 responses at max. Skipping for now.
      this.setState({
        messages: [ ...this.state.messages, conversation ]
      });
    }
    //
  }
  

  componentDidUpdate() {

    if (this.messagesEnd.current) {
      setTimeout(() => {
          this.messagesEnd.current.scrollIntoView({
          behavior: 'smooth'
        })
      }, 200)
      
    }
    
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

  // Handle Chatbot open/close
  toggleChatbot = () => {
    this.setState({
      opened: !this.state.opened
    })
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
    if (inputValue) {
      this.textQuery(inputValue);
    }
    
    //Reset.
    this.setState({
      inputValue: ''
    })
  }

  // Handle Quick Reply Payload
  handleQuickReplyPayload = (event, payload, text) => {
    event.preventDefault();
    
    // All event payload must be in the format 'event_something'
    if (payload.startsWith('event')) {
      return this.eventQuery(payload);
    }

    return this.textQuery(text);
  }
  
  /*
    The main component that's responsible for rendering different types of messages.
    Text, Cards, Quick Replies.
  */
  renderMessages = () => {
    const { messages } = this.state;


    return messages.map((message, i) => {
      // For channel recommendations additional parameter field is added.
      if (message.parameters && message.parameters['channel-type']) {
        let recommendations = [];
        const response = JSON.parse(message.msg?.text?.text[0]);
        if (response) {
          recommendations = response.recommendations;
        }
        return (
          <div>
            
            <Message initiator="bot" message="Here are my suggestions" />
            {

              recommendations.map(recommendation => {
                return (
                  <Recommendation key={recommendation._id} recommendation={recommendation} />
                )     
              })
            }
          </div>
        )
      }

      if (message.msg?.text?.text) {
        return <Message key={i} initiator={message.speaks} message={message.msg.text.text} />
      }  
      // Quick Replies.
      else if (message.msg?.payload?.fields?.quick_replies) {
        // Dont' want to spam the user. So quick replies will load only once per load.
        if (!this.quickReplyShown) {
          this.quickReplyShown = true;
          return <QuickReplies 
            key={i} text={message.msg.payload.fields.text}
            payload={message.msg.payload.fields.quick_replies.listValue.values}
            handleClick={this.handleQuickReplyPayload} 
          />
        }
        
      }
    });
  };
  
  // Renders all the cards.
  renderCards = (cards) => {
    return cards.map((card, i) => <Card key={i} payload={card.structValue} />)
  }

  // Render method.
  render() {
    const {opened} = this.state;
    return (
      <div className={`chatbot ${this.state.opened ? 'open' : ''}`}
      >
        {!opened && (
        <div className="chatbot-inner-unopened" onClick={this.toggleChatbot}>
          <i class="material-icons">message</i>
        </div>
          
        )}
        {opened && (
          <div
          className="chatbot-inner"
        >
          <div className="chatbot-header" onClick={this.toggleChatbot}>
            <h5>Toby</h5>

              <i className="material-icons chatbot-toggle">close</i>
          </div>

          <div className="chatbot-body">
            {this.renderMessages()}

            <div ref={this.messagesEnd}></div>
          </div>
          
          <form  onSubmit={this.handleSubmit}>
            <input className="chat-input" autoFocus={true} type="text" onChange={this.handleInputChange} value={this.state.inputValue} placeholder="Send your messsage"/>

            <button type="submit" className="chat-submit">
              <i class="material-icons">send</i>
            </button>
          </form>
          
        </div>
        )}
        
      </div>
    );
  }
}
