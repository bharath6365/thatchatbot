import React from 'react';

// Just used for rendering text messages.
export default function Message({ initiator, message }) {
  return (
    <div className="col s12 m8 offset-m2 offset-l3">
      <div className="card-panel grey lighten-5 z-depth-1">
        <div className="row valign-wrapper">

          {initiator === 'bot' && (
            <div className="col s2">
              <a className="btn-floating btn-large waves-effect waves-light red">
                <i class="material-icons">{initiator}</i>
              </a>
            </div>
          )}

          <div className="col s10">
            <span className="black-text">{message}</span>
          </div>

          {initiator === 'me' && (
            <div className="col s2">
              <a className="btn-floating btn-large waves-effect waves-light red">
                <i class="material-icons">{initiator}</i>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
