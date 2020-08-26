import React from 'react';

export default function Landing() {
  return (
    <div className="content-wrapper">
      <h1>Welcome to my Chatbot Page</h1>
      <p>
        My Chatbot goes by the name of Toby and he is primarily built for recommending <b>youtube channels.</b> For example, ask him to
        recommend channels on Frontend Enginnering.We aren't limited to tech and nerdy channels 🤓. Toby also suggests recommendations for Fitness etc. Here are the list of items can Toby can respond to as of today.
      </p>

      <ul>
        <li>
          🏃‍♀️ Channel for Fitness
        </li>
        <li>
          💻 Recommendations for Backend Enginnering.
        </li>
        <li>
          👱‍♂️Channel for Career Advice. (Don't miss this one)
        </li>
        <li>
          🤓 Frontend channels.
        </li>
      </ul>

      <p>
        Toby can also tell you <b>Jokes</b>. Well there are only a list of 12-15 curated jokes as of today but you will be prompted to add your own joke. Once you have added it I have the job of reviewing it and adding it to the main list of jokes.
      </p>
    </div>
  );
}
