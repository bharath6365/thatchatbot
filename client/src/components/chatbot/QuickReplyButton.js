// Loads the button for quick reply components. Doesn't handle links for now. Just text events.
import React from 'react';

export default function QuickReplyButton({ reply, handleClick }) {
  return (
    <button
      onClick={(event) =>
        handleClick(event, reply.structValue.fields.payload.stringValue, reply.structValue.fields.text.stringValue)}
    >
      {reply.structValue.fields.text.stringValue}
    </button>
  );
}
