import React, {useState, useEffect} from 'react';
import CardComponent from './CardComponent.jsx';
import AddForm from './AddForm.jsx';
import SignIn from './SignIn.jsx';
import SignOut from './SignOut.jsx';

import axios from 'axios';
import {Image} from 'cloudinary-react';
import mockData from '../../../mockData.js';

const App = () => {
  const [imageSelected, setImageSelected] = useState([]);
  const [data, setData] = useState(mockData);
  const [index, setIndex] = useState(0);

  const slideLeft = () => {
    if (index - 1 >= 0) {
      setIndex(index - 1);
    }
  };

  const slideRight = () => {
    if (index + 1 <= data.length - 1) {
      setIndex(index + 1);
    }
  };

  // console.log("MOCK DATA: ", mockData);
  const uploadImage = (files) => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "ebqmycin")

    axios.post("https://api.cloudinary.com/v1_1/doryckkpf/image/upload", formData)
      .then((response) => {
        console.log(response.data.secure_url);
      })
  }

  return (
    <div id="App">
      <SignIn />
      <SignOut />
      <h1 className="app-title">Keyboard Gallery</h1>
      <div className="component-container">
        <CardComponent data={data} index={index} slideLeft={slideLeft} slideRight={slideRight}/>
        <AddForm setImageSelected={setImageSelected} uploadImage={uploadImage}/>
      </div>
    </div>
  );
}

export default App;

{/* <Image cloudName="doryckkpf" publicId="https://res.cloudinary.com/doryckkpf/image/upload/v1686077062/nuv53liw1lw8to6vgpuc.jpg" style={{width: 500}}/> */}