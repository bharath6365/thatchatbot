import React from 'react';

export default function Card(props) {
  return (
    <div
      style={{
        width: 270,
        paddingRight: '30px',
        float: 'left'
      }}
    >
      <div className="card">
        <div className="card-image" style={{ width: 270, float: 'left', paddingRight: '30px'}}>
          <img
            src={props.payload.fields.image.stringValue}
            alt={props.payload.fields.header.stringValue}
            src="images/sample-1.jpg"
          />
          <span className="card-title">{props.payload.fields.header.stringValue}</span>
        </div>
        <div className="card-content">
          <p>{props.payload.fields.description.stringValue}</p>
        </div>
        <div className="card-action">
          <a target="_blank" href="{props.payload.fields.link.stringValue}">
            View more details.
          </a>
        </div>
      </div>
    </div>
  );
}
