import React from 'react';

const GuestCardView = ({ keyboard, handleImageModal }) => {
  return (
    <div className='card-container'>
      <div className="image-container">
        <img src={keyboard.imageUrl} alt={keyboard.keyboard} onClick={handleImageModal} />
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
    </div>
  )
}

export default GuestCardView
;