import React from 'react';

const DeleteModal = ({ handleOutsideClick, closeDeletePop, handleDelete, deleteDetails }) => {

  return (
    <div>
      <div id="deleteModal" className="modal" onClick={handleOutsideClick}>
        <div className="modal-content deleteModal">
          <div className="modal-header">
            <h3>Are you sure you want to delete this build?</h3>
          </div>
          <div className="modalContentButtons">
            <button onClick={closeDeletePop}>Cancel</button>
            <button onClick={() => {handleDelete(deleteDetails.details.id, deleteDetails.details.creator)}} >Yes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal;