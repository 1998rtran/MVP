import React, { useState, useEffect }from 'react';
import DeleteModal from './Modals/DeleteModal.jsx';

const AuthCardView = ({ keyboard, handleLike, handleImageModal, handleDelete, handleEdit, editCard, edit, setEdit, editData, setEditData, handleOutsideClick }) => {
const [deleteDetails, setDeleteDetails] = useState({id: '', creator: ''})
const [deleteModal, setDeleteModal] = useState(false);

const closeDeletePop = () => {
  setDeleteModal(false);
}

const deletePop = (id, creator) => {
  setDeleteDetails({details: {
    ...deleteDetails.details, id: id, creator: creator
  }})
  setDeleteModal(true);
}

  if (!edit) {
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
            <p>{keyboard.likes} <a className="likebtn" onClick={(e) => { handleLike(keyboard._id) }}>likes</a></p>
          </div>
          <div className="creator">
            <p>Submitted by: {keyboard.creator}</p>
          </div>
        </div>
        {deleteModal && (<DeleteModal closeDeletePop={closeDeletePop} handleOutsideClick={handleOutsideClick} handleDelete={handleDelete} deleteDetails={deleteDetails}/>)}
        <div className="btn">
          <button onClick={() => {
            editCard(keyboard.creator);
            setEditData({
              response:
              {
                ...editData.response,
                editKeyboard: keyboard.keyboard,
                editSwitches: keyboard.switches,
                editKeycaps: keyboard.keycaps
              }
            });
          }}><a>Edit</a></button>
          <button onClick={(e) => { deletePop(keyboard._id, keyboard.creator) }}><a>Delete</a></button>
        </div>
      </div>
    )
  } else {
    return (
      <div className='card-container'>
        <div className="image-container">
          <img src={keyboard.imageUrl} alt={keyboard.keyboard} required onClick={handleImageModal} />
        </div>
        <div className="card-content">
          <div className="card-title">
            <label>Keyboard: </label>
            <input defaultValue={keyboard.keyboard} onChange={(e) => {
              setEditData({
                response:
                {
                  ...editData.response, editKeyboard: e.target.value,
                }
              })
            }} />
          </div>
          <div className="card-switches">
            <label>Switches: </label>
            <input defaultValue={keyboard.switches} required onChange={(e) => {
              setEditData({
                response:
                {
                  ...editData.response, editSwitches: e.target.value,
                }
              })
            }} />
          </div>
          <div className="card-keycaps">
            <label>Keycaps: </label>
            <input defaultValue={keyboard.keycaps} required onChange={(e) => {
              setEditData({
                response:
                {
                  ...editData.response, editKeycaps: e.target.value,
                }
              })
            }} />
          </div>
          <div className="creator">
            <p>Created by: {keyboard.creator}</p>
          </div>
        </div>
        <div className="btn">
          <button onClick={() => { editCard(keyboard.creator) }}><a>Cancel</a></button>
          <button onClick={(e) => {
            handleEdit(keyboard._id);
            setEdit();
          }}><a>Submit</a></button>
        </div>
      </div>
    )
  }
}

export default AuthCardView;