import React from 'react';

export default function Landing() {
  return (
    <div className="container">
      <div className="content-wrapper">
        <h1>Welcome to my Chatbot Page</h1>
        <p>
          My Chatbot goes by the name of Toby and he is primarily built for recommending youtube channels. For example, ask him to
          recommend channels on Frontend Development.We aren't limited to tech channels. Toby also suggests recommendations for Fitness, Finance etc. Here are the list of items can Toby can respond to as of today.
        </p>

        <ul>
          <li>
            Channel for Fitness
          </li>

          <li>
            Recommendations for Backend Development
          </li>
        </ul>
      </div>
    </div>
  );
}
