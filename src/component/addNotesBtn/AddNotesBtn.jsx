import React from 'react';
import './AddNotesBtn.css';
import { useNoteInputContext, useToken } from '../../context/context-index';
import { useNavigate } from 'react-router';

export const AddNoteBtn = () => {
  const { displayModal, noteDispatch } = useNoteInputContext();
  const navigate = useNavigate();
  const { token } = useToken();
  const handleAddClick = () => {
    token
      ? noteDispatch({ type: 'DISPLAY_MODAL', payload: !displayModal })
      : navigate('/login');
  };
  return (
    <button className="add-button" onClick={handleAddClick}>
      <span className="add-button-icon fas fa-plus-circle"></span>
    </button>
  );
};
