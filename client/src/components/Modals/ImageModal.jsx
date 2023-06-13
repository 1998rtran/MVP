import React from 'react';

const ImageModal = ({ img, imgAlt, handleOutsideClick, closeModal }) => {
  return (
    <div>
      <div id="imageModal" className="modal" onClick={handleOutsideClick}>
        <span className="close" onClick={closeModal}>&times;</span>
        <img className="image-modal-content" id="img01" src={img} />
        <div id="caption">{imgAlt}</div>
      </div>
    </div>
  )
}

export default ImageModal;