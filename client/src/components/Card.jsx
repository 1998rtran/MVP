import React from 'react';

const Card = ({ keyboard, cardStyle }) => {

return (
  <div className={`card-container ${cardStyle}`}>
    <div className="image-container">
      <img src={keyboard.imageUrl} alt={keyboard.keyboard}/>
    </div>
    <div className="card-content">
      <div className="card-title">
        <h3>Keyboard: {keyboard.keyboard}</h3>
      </div>
      <div className="card-switches">
        <p>Switches: {keyboard.switches}</p>
      </div>
      <div className="card-keycaps">
        <p>Keycaps: {keyboard.keycaps}</p>
      </div>
      <div className="likes">
        <p>{keyboard.likes} likes</p>
        <button className="likebtn" onClick={(e) => {console.log(e)}}>&#9825;</button>
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