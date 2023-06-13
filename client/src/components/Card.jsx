import React, { useState } from 'react';
import AuthCardView from './AuthCardView.jsx';
import GuestCardView from './GuestCardView';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const Card = ({ keyboard, handleLike, handleImageModal, handleDelete, handleEdit, editData, setEditData, handleOutsideClick }) => {
  const [edit, setEdit] = useState(false);
  const { isAuthenticated, user } = useAuth0();

  const editCard = (creator) => {
    if (user.nickname === creator || '1998rtran' || 'raymondtran14') {
      setEdit(!edit);
    } else {
      alert("Cannot edit somebody else's build");
      return;
    }
  }

  if (isAuthenticated) {
    return (
      <AuthCardView
        keyboard={keyboard}
        handleLike={handleLike}
        handleImageModal={handleImageModal}
        handleDelete={handleDelete}
        handleOutsideClick={handleOutsideClick}
        edit={edit}
        setEdit={setEdit}
        editCard={editCard}
        handleEdit={handleEdit}
        editData={editData}
        setEditData={setEditData}/>
    )
  } else {
    return (
      <GuestCardView keyboard={keyboard} handleImageModal={handleImageModal} />
    )
  }
}

export default Card;