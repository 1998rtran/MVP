import React, {useState, useEffect} from 'react';
import CardComponent from './CardComponent.jsx';
import AddForm from './AddForm.jsx';
import SignIn from './SignIn.jsx';
import SignOut from './SignOut.jsx';

import axios from 'axios';
import {Image} from 'cloudinary-react';
import { useAuth0 } from "@auth0/auth0-react";
import mockData from '../../../mockData.js';

const App = () => {
  const [imageSelected, setImageSelected] = useState([]);
  const [data, setData] = useState(mockData);
  const [index, setIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [buildData, setBuildData] = useState({response: {
    keyboard: '',
    description: '',
    imageUrl: '',
    creator: '',
    likes: 0
  }})

  const { isAuthenticated, isLoading, user } = useAuth0();

  const name = user?.name || 'Guest'

const openModal = () => {
  setModalVisible(true);
}

const closeModal = () => {
  setModalVisible(false);
}

const handleOutsideClick = (e) => {
  if (e.target === document.getElementById('formModal')) {
    closeModal();
  }
}

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

  const uploadImage = (files) => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "ebqmycin")

    axios.post("https://api.cloudinary.com/v1_1/doryckkpf/image/upload", formData)
      .then((response) => {
        setBuildData({ response: {
          ...buildData.response, imageUrl: response.data.secure_url, creator: name
          }
        })
        // return axios.post('serverdatabaseurl', buildData);
      })
      // .then(() => {
      //   return axios.get('serverdatabaseurl')
      //     .then((response) => {
      //       setData(response.data);
      //     })
      //     .catch((error) => {
      //       console.log('Unable to get data: ', error);
      //     })
      // })
  }

  // useEffect(() => {
  //   console.log(buildData);
  // }, [buildData])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isAuthenticated) {
    return (
      <div id="App">
        <SignOut />
        <h2>Welcome, {name}!</h2>
        <h1 className="app-title">Keyboard Gallery</h1>
        <div className="component-container">
          <CardComponent data={data} index={index} slideLeft={slideLeft} slideRight={slideRight}/>
          <button id="modalBtn" onClick={openModal}>Add a build!</button>
        { modalVisible && (<div id="formModal" className="modal" onClick={handleOutsideClick}>
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <AddForm
                setImageSelected={setImageSelected}
                uploadImage={uploadImage}
                buildData={buildData}
                setBuildData={setBuildData}
                closeModal={closeModal}/>
            </div>
          </div> )}
        </div>
      </div>
    );
  } else {
    return (
      <div id="App">
      <SignIn />
      <h1 className="app-title">Keyboard Gallery</h1>
      <div className="component-container">
        <CardComponent data={data} index={index} slideLeft={slideLeft} slideRight={slideRight}/>
      </div>
    </div>
    )
  }
}

export default App;

{/* <AddForm setImageSelected={setImageSelected} uploadImage={uploadImage}/> */}
{/* <Image cloudName="doryckkpf" publicId="https://res.cloudinary.com/doryckkpf/image/upload/v1686077062/nuv53liw1lw8to6vgpuc.jpg" style={{width: 500}}/> */}