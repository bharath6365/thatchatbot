import React from 'react';

export default function Recommendation({ recommendation }) {
  return (
    <a href={recommendation.link} target="_blank">
      <div className="card">
        <img src={recommendation.imageUrl} />
        <div className="card-body">
          <h3>{recommendation.name}</h3>
          <p>{recommendation.description}</p>

          <div className="link">
            <span>Visit</span>
            <i class="material-icons">forward</i>
          </div>
        </div>
      </div>
    </a>
  );
}
