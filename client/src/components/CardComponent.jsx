import React from 'react';
import Card from './Card.jsx';

const CardComponent = ({ data, index, slideLeft, slideRight }) => {

return (
  <div className="carousel">
          <div>
        <button className="leftArrow" type="button" onClick={slideLeft}>&#8678;</button>
      </div>
      <div className="card-component">
    {data.map((keyboard, n) => {
    let position = n > index ? "nextCard"
    : n === index ? "activeCard" : "prevCard";
    return <Card key={n} keyboard={keyboard} cardStyle={position}/>})}
      </div>
          <div>
        <button className="rightArrow" type="button" onClick={slideRight}>&#x21e8;</button>
      </div>
  </div>
)
}

export default CardComponent;

// return (
//   <div className="card-component">
//     {data.map((keyboard, i) => (<Card key={i} keyboard={keyboard}/>))}
//   </div>
// )