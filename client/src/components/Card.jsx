import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const Card = ({ keyboard, handleLike }) => {
const [showModal, setShowModal] = useState(false);
const { isAuthenticated } = useAuth0();

const handleImageModal = (e) => {
  setShowModal(true);
  // console.log(e.target.src);
  // let test = document.getElementById('img01');
  // console.log(test);
  // document.getElementById('img01').src = e.target.src;
  // document.getElementById('caption').innerText = e.target.alt;
}

if (isAuthenticated) {
return (
  <div className='card-container'>
    <div className="image-container">
      <img src={keyboard.imageUrl} alt={keyboard.keyboard} />
    </div>
{/* { showModal ?? <div className="img-modal" className="modal">
      <span className="close">&times;</span>
      <img className="img-modal-content" id="img01" />
      <div id="caption"></div>
    </div>} */}
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
        <a onClick={handleImageModal}>
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
          <a onClick={handleImageModal}>
            View More
          </a>
        </button>
      </div>
    </div>
  )
}
}

export default Card;