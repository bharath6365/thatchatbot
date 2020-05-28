import React from 'react';
import '../App.scss';
import Landing from './Pages/Landing';
import Chatbot from './chatbot/Chatbot';

function App() {
  return (
    <div className="App container">
      <Landing />
      <Chatbot />
    </div>
  );
}

export default App;
