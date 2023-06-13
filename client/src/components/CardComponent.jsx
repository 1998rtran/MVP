import React from 'react';
import Card from './Card.jsx';

const CardComponent = ({ gallery, index, handleLike, handleImageModal, handleDelete, handleEdit, editData, setEditData, handleOutsideClick }) => {

  return (
    <div className="card-component">
      {gallery.map((keyboard, n) => {
        return <Card
          key={n}
          keyboard={keyboard}
          handleLike={handleLike}
          handleImageModal={handleImageModal}
          handleDelete={handleDelete}
          handleOutsideClick={handleOutsideClick}
          handleEdit={handleEdit}
          editData={editData}
          setEditData={setEditData}/>
      })}
    </div>
  )
}

export default CardComponent;
