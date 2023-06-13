import React from 'react';
import AddForm from '../AddForm.jsx';

const SubmitModal = ({ handleOutsideClick, closeModal, setImageSelected, uploadImage, buildData, setBuildData, handleSubmit }) => {
  return (
    <div id="formModal" className="modal" onClick={handleOutsideClick}>
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={closeModal}>&times;</span>
          <h3>Add your Build!</h3>
        </div>
        <AddForm
          setImageSelected={setImageSelected}
          uploadImage={uploadImage}
          buildData={buildData}
          setBuildData={setBuildData}
          closeModal={closeModal}
          handleSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default SubmitModal;