import React from 'react';
import '../App.css';
import 'materialize-css/dist/css/materialize.min.css';
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
