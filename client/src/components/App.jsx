import React, { useState, useEffect } from 'react';
import CardComponent from './CardComponent.jsx';
import AddForm from './AddForm.jsx';
import SignIn from './SignIn.jsx';
import SignOut from './SignOut.jsx';
import ImageModal from './Modals/ImageModal.jsx';
import SubmitModal from './Modals/SubmitModal.jsx';

import axios from 'axios';
import { Image } from 'cloudinary-react';
import { useAuth0 } from "@auth0/auth0-react";
import mockData from '../../../mockData.js';

const App = () => {
  const [imageSelected, setImageSelected] = useState([]);
  const [data, setData] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [confirmation, setConfirmation] = useState(false);
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
        setGallery(response.data);
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
    if (e.target === document.getElementById('formModal') || (e.target === document.getElementById('imageModal')) || (e.target === document.getElementById('deleteModal'))) {
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
        setConfirmation(true);
      })
  }

  const handleSubmit = () => {
    if (confirmation) {
      axios.post('/keyboardgallery', buildData.response)
        .then(() => {
          return axios.get('/keyboardgallery')
            .then((response) => {
              setGallery(response.data);
              setConfirmation(false);
              setBuildData({
                response: {
                  keyboard: '',
                  switches: '',
                  keycaps: '',
                  imageUrl: '',
                  creator: '',
                  likes: 0
                }
              })
            })
            .catch((error) => {
              console.log('Unable to get data: ', error);
            })
        });
        closeModal();
    } else {
      alert('Please confirm your build first!');
      return;
    }
  }

  const handleLike = (id) => {
    axios.patch(`/keyboardgallery/${id}`, { $inc: { likes: 1 } })
      .then(() => {
        setGallery((prevGallery) => {
          const updatedGallery = prevGallery.map((keyboard) => {
            if (keyboard._id === id) {
              return { ...keyboard, likes: keyboard.likes + 1 };
            }
            return keyboard;
          });
          return updatedGallery;
        });
      })
      .catch((error) => {
        console.log('Unable to update likes: ', error);
      });
  };

  const handleEdit = (id) => {
    if (editData.response.editKeyboard === '' || editData.response.editSwitches === '' || editData.response.editKeycaps === '') {
      alert('Please fill out all sections');
      return;
    } else {
      axios.put(`/keyboardgallery/${id}`, editData)
        .then(() => {
          return axios.get('/keyboardgallery')
            .then((response) => {
              setGallery(response.data);
            })
            .catch((error) => {
              console.log('Unable to get data: ', error);
            })
        })
    }
  }

  const handleDelete = (id, creator) => {
    if (user.nickname === creator || '1998rtran' || 'raymondtran14') {
      axios.delete(`/keyboardgallery/${id}`)
        .then(() => {
          return axios.get('/keyboardgallery')
            .then((response) => {
              setGallery(response.data);
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

  const sortList = (value) => {
    return axios.get('/keyboardgallery')
      .then((response) => {
        if (value === 'Most Recent') {
          const recentData = [...response.data].reverse();
          setGallery(recentData);
        }
        if (value === 'Most Liked') {
          const likedData = [...response.data].sort((a, b) => b.likes - a.likes);
          setGallery(likedData);
        }
      })
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
        <div className="welcome-header" >
          <h2 className="welcome">Welcome, {name}!</h2>
          <SignOut />
        </div>
        <div className="app-title">
          <h1> <img className="icon" src="https://res.cloudinary.com/doryckkpf/image/upload/v1686251971/RaysKeysNavyWhite_yb0esy.png" alt="icon" />KeeBeeBuilds</h1>
        </div>
        <div className="sortingFeature">
          <select defaultValue="Sort By" onChange={(e) => { sortList(e.target.value) }}>
            <option value="Sort By" disabled>Sort By</option>
            <option value="Most Recent">Most Recent</option>
            <option value="Most Liked">Most Liked</option>
          </select>
        </div>
        <div className="component-container">
          <CardComponent
            gallery={gallery}
            handleLike={handleLike}
            handleImageModal={handleImageModal}
            handleDelete={handleDelete}
            handleOutsideClick={handleOutsideClick}
            handleEdit={handleEdit}
            editData={editData}
            setEditData={setEditData}
          />
          <div className="modalBtnContainer">
            <button id="modalBtn" onClick={openModal}>Add a build!</button>
          </div>
          {modalVisible && (<SubmitModal
            handleOutsideClick={handleOutsideClick}
            setImageSelected={setImageSelected}
            uploadImage={uploadImage}
            buildData={buildData}
            setBuildData={setBuildData}
            closeModal={closeModal}
            handleSubmit={handleSubmit} />)}
        </div>
        {imgModal && (<ImageModal img={img} imgAlt={imgAlt} closeModal={closeModal} handleOutsideClick={handleOutsideClick} />)}
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
          <div className="sortingFeature">
            <select defaultValue="Sort By" onChange={(e) => { sortList(e.target.value) }}>
              <option value="Sort By" disabled>Sort By</option>
              <option value="Most Recent">Most Recent</option>
              <option value="Most Liked">Most Liked</option>
            </select>
          </div>
          <h1> <img className="icon" src="https://res.cloudinary.com/doryckkpf/image/upload/v1686251971/RaysKeysNavyWhite_yb0esy.png" alt="icon" /> KeeBeeBuilds</h1>
        </div>
        <div className="component-container">
          <CardComponent gallery={gallery} handleImageModal={handleImageModal} />
        </div>
        {imgModal && (<ImageModal img={img} imgAlt={imgAlt} closeModal={closeModal} handleOutsideClick={handleOutsideClick} />)}
      </div>
    )
  }
}

export default App;
