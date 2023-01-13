import React, { useEffect, useRef, useState } from 'react';
import './AddNotesBtn.css';
import { useNoteInputContext, useToken } from '../../context/context-index';
import { useNavigate } from 'react-router';

export const AddNoteBtn = ({ getBtnRef, btnFloat }) => {
  const { displayModal, noteDispatch } = useNoteInputContext();
  const addBtnRef = useRef();

  const navigate = useNavigate();
  const { token } = useToken();
  const handleAddClick = () => {
    token
      ? noteDispatch({ type: 'DISPLAY_MODAL', payload: !displayModal })
      : navigate('/login');
  };

  useEffect(() => {
    getBtnRef(addBtnRef);
  }, []);

  return (
    <>
      <button
        className={`add add-btn-float ${btnFloat ? 'visible' : ''}`}
        onClick={handleAddClick}
      >
        <span className="add-button-icon fas fa-plus-circle"></span>
      </button>

      <button
        className="add add-button"
        onClick={handleAddClick}
        ref={addBtnRef}
      >
        <span className="add-button-icon fas fa-plus-circle"></span>
      </button>
    </>
  );
};
