import React, { useState, useEffect } from 'react';
import CardComponent from './CardComponent.jsx';
import AddForm from './AddForm.jsx';
import SignIn from './SignIn.jsx';
import SignOut from './SignOut.jsx';

import axios from 'axios';
import { Image } from 'cloudinary-react';
import { useAuth0 } from "@auth0/auth0-react";
import mockData from '../../../mockData.js';

const App = () => {
  const [imageSelected, setImageSelected] = useState([]);
  const [data, setData] = useState(mockData);
  const [modalVisible, setModalVisible] = useState(false);
  const [imgModal, setImgModal] = useState(false);
  const [img, setImg] = useState('');
  const [imgAlt, setImgAlt] = useState('');
  const [editData, setEditData] = useState({
    response: {
      editKeyboard: '',
      editSwitches: '',
      editKeycaps: ''
    }
  })
  const [buildData, setBuildData] = useState({
    response: {
      keyboard: '',
      switches: '',
      keycaps: '',
      imageUrl: '',
      creator: '',
      likes: 0
    }
  })

  const { isAuthenticated, isLoading, user } = useAuth0();

  const name = user?.nickname || 'Guest'

  useEffect(() => {
    axios.get('/keyboardgallery')
      .then((response) => {
        setData(response.data);
      })
  }, [])

  const openModal = () => {
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
    setImgModal(false);
  }

  const handleOutsideClick = (e) => {
    if (e.target === document.getElementById('formModal') || (e.target === document.getElementById('imageModal'))) {
      closeModal();
    }
  }

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "ebqmycin")

    axios.post("https://api.cloudinary.com/v1_1/doryckkpf/image/upload", formData)
      .then((response) => {
        setBuildData({
          response: {
            ...buildData.response, imageUrl: response.data.secure_url, creator: name
          }
        })
      })
      .then(() => {
        alert('Successfully confirmed keyboard build!');
      })
  }

  const handleSubmit = () => {
    axios.post('/keyboardgallery', buildData.response)
      .then(() => {
        return axios.get('/keyboardgallery')
          .then((response) => {
            console.log('Response Data: ', response.data)
            setData(response.data);
          })
          .catch((error) => {
            console.log('Unable to get data: ', error);
          })
      });
  }

  const handleLike = (id) => {
    axios.patch(`/keyboardgallery/${id}`, { $inc: { likes: 1 } })
      .then(() => {
        setData((data) => {
          return data.map((keyboard) => {
            if (keyboard._id === id) {
              return { ...keyboard, likes: keyboard.likes + 1 };
            }
            return keyboard;
          })
        })
      })
  }

  const handleEdit = (id) => {
    if (editData.response.editKeyboard === '' || editData.response.editSwitches === '' || editData.response.editKeycaps === '') {
      alert('Please fill out all sections');
      return;
    } else {
      axios.put(`/keyboardgallery/${id}`, editData)
        .then(() => {
          return axios.get('/keyboardgallery')
            .then((response) => {
              setData(response.data);
            })
            .catch((error) => {
              console.log('Unable to get data: ', error);
            })
        })
    }
  }

  const handleDelete = (id, creator) => {
    if (user.nickname === creator) {
      axios.delete(`/keyboardgallery/${id}`)
        .then(() => {
          return axios.get('/keyboardgallery')
            .then((response) => {
              setData(response.data);
            })
            .catch((error) => {
              console.log('Unable to get data: ', error);
            })
        })
    } else {
      alert("Cannot delete somebody else's build");
      return;
    }
  }

  const handleImageModal = (e) => {
    setImgModal(true);
    setImg(e.target.src);
    setImgAlt(e.target.alt);
  }

  // useEffect(() => {
  //   console.log('EDIT DATA: ', editData);
  //   console.log('BUILD DATA: ', buildData);
  // }, [editData, buildData])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isAuthenticated) {
    return (
      <div id="App">
        <div className="welcome-header">
          <h2 className="welcome">Welcome, {name}!</h2>
          <SignOut />
        </div>
        <div className="app-title">
          <h1> <img className="icon" src="https://res.cloudinary.com/doryckkpf/image/upload/v1686251971/RaysKeysNavyWhite_yb0esy.png" alt="icon" /> KeeBeeBuilds</h1>
        </div>
        <div className="component-container">
          <CardComponent
          data={data}
          handleLike={handleLike}
          handleImageModal={handleImageModal}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          editData={editData}
          setEditData={setEditData}
        />
          <div className="modalBtnContainer">
            <button id="modalBtn" onClick={openModal}>Add a build!</button>
          </div>
          {modalVisible && (<div id="formModal" className="modal" onClick={handleOutsideClick}>
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <AddForm
                setImageSelected={setImageSelected}
                uploadImage={uploadImage}
                buildData={buildData}
                setBuildData={setBuildData}
                closeModal={closeModal}
                handleSubmit={handleSubmit} />
            </div>
          </div>)}
        </div>
        {imgModal && (<div id="imageModal" className="modal" onClick={handleOutsideClick}>
          <span className="close" onClick={closeModal}>&times;</span>
          <img className="image-modal-content" id="img01" src={img}/>
          <div id="caption">{imgAlt}</div>
        </div>)}
      </div>
    );
  } else {
    return (
      <div id="App">
        <div className="welcome-header">
          <h2 className="welcome">Welcome, {name}!</h2>
          <SignIn />
        </div>
        <div className="app-title">
          <h1> <img className="icon" src="https://res.cloudinary.com/doryckkpf/image/upload/v1686251971/RaysKeysNavyWhite_yb0esy.png" alt="icon" /> KeeBeeBuilds</h1>
        </div>
        <div className="component-container">
          <CardComponent data={data} handleImageModal={handleImageModal}/>
        </div>
        {imgModal && (<div id="imageModal" className="modal" onClick={handleOutsideClick}>
          <span className="close" onClick={closeModal}>&times;</span>
          <img className="image-modal-content" id="img01" src={img}/>
          <div id="caption">{imgAlt}</div>
        </div>)}
      </div>
    )
  }
}

export default App;
