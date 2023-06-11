import React from 'react';
import Card from './Card.jsx';

const CardComponent = ({ data, index, handleLike, handleImageModal}) => {

  return (
    <div className="card-component">
      {data.map((keyboard, n) => {
        return <Card key={n} keyboard={keyboard} handleLike={handleLike} handleImageModal={handleImageModal}/>
      })}
    </div>
  )
}

export default CardComponent;
