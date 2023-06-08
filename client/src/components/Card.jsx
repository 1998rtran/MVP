import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const Card = ({ keyboard, handleLike }) => {

const { isAuthenticated } = useAuth0();

if (isAuthenticated) {
return (
  <div className='card-container'>
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
        <button className="likebtn" onClick={(e) => {handleLike(keyboard._id)}}>&#9825;</button>
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
} else {
  return (
    <div className='card-container'>
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
}

export default Card;