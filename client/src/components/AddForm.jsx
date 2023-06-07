import React from 'react';

const AddForm = ({ setImageSelected, uploadImage }) => {
  return (
    <div>
      <input type="file" onChange={(e) => {setImageSelected(e.target.files[0])}}/>
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  )
}

export default AddForm;