import React from 'react';
import Card from './Card.jsx';

const CardComponent = ({ data, index, handleLike}) => {

  return (
    <div className="card-component">
      {data.map((keyboard, n) => {
        return <Card key={n} keyboard={keyboard} handleLike={handleLike} />
      })}
    </div>
  )
}

export default CardComponent;
