import React from 'react';

const Card = ({ keyboard, cardStyle }) => {

return (
  <div className={`card-container ${cardStyle}`}>
    <div className="image-container">
      <img src={keyboard.imageUrl} alt=""/>
    </div>
    <div className="card-content">
      <div className="card-title">
        <h3>{keyboard.keyboard}</h3>
      </div>
      <div className="card-description">
        <p>{keyboard.description}</p>
      </div>
      <div className="likes">
        <p>{keyboard.likes} likes</p>
      </div>
      <div className="creator">
        <p>Created by: {keyboard.creator}</p>
      </div>
    </div>
    <div className="btn">
      <button>
        <a>
          View More
        </a>
      </button>
    </div>
  </div>
)
}

export default Card;