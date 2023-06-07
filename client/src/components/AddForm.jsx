import React from 'react';

const AddForm = ({ setImageSelected, uploadImage, buildData, setBuildData, closeModal }) => {

  return (
    <div>
      <div>
        <label>Keyboard</label>
        <input type="text" placeholder="input keyboard name" onChange={(e)=> {
          setBuildData({ response: {
            ...buildData.response, keyboard: e.target.value
          }})
        }}/>
      </div>
      <div>
        <label>Description</label>
        <textarea type="text" placeholder="input keyboard build details" onChange={(e) => {
          setBuildData({ response: {
            ...buildData.response, description: e.target.value
          }})
        }}/>
      </div>
      <input type="file" onChange={(e) => {setImageSelected(e.target.files[0])}}/>
      <button onClick={() => {
        uploadImage();
        closeModal();
        alert('Successfully submitted keyboard build!')
        }}>Submit Build!</button>
    </div>
  )
}

export default AddForm;