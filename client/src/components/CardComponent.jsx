import React from 'react';
import Card from './Card.jsx';

const CardComponent = ({ data, index, handleLike, handleImageModal, handleDelete, handleEdit, editData, setEditData }) => {

  return (
    <div className="card-component">
      {data.map((keyboard, n) => {
        return <Card
        key={n}
        keyboard={keyboard}
        handleLike={handleLike}
        handleImageModal={handleImageModal}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        editData={editData}
        setEditData={setEditData}/>
      })}
    </div>
  )
}

export default CardComponent;
