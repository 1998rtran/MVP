import React from 'react';

const AddForm = ({ setImageSelected, uploadImage, buildData, setBuildData, closeModal, handleSubmit }) => {

  return (
    <div>
      <div>
        <label>Keyboard: </label>
        <input type="text" placeholder="input keyboard" onChange={(e)=> {
          setBuildData({ response: {
            ...buildData.response, keyboard: e.target.value
          }})
        }}/>
      </div>
      <div>
        <label>Switches: </label>
        <input type="text" placeholder="input switches" onChange={(e) => {
          setBuildData({ response: {
            ...buildData.response, switches: e.target.value
          }})
        }}/>
      </div>
      <div>
        <label>Keycaps: </label>
        <input type="text" placeholder="input keycaps" onChange={(e) => {
          setBuildData({ response: {
            ...buildData.response, keycaps: e.target.value
          }})
        }}/>
      </div>
      <input type="file" onChange={(e) => {setImageSelected(e.target.files[0])}}/>
      <button onClick={uploadImage}>Confirm Build</button>
      <button onClick={() => {
        handleSubmit();
        closeModal();
      }}>Submit Build!</button>
    </div>
  )
}

export default AddForm;