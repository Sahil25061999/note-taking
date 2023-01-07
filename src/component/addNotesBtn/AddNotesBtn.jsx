import React, { useEffect, useRef, useState } from 'react';
import './AddNotesBtn.css';
import { useNoteInputContext, useToken } from '../../context/context-index';
import { useNavigate } from 'react-router';

export const AddNoteBtn = () => {
  const { displayModal, noteDispatch } = useNoteInputContext();
  const [btnFloat, setBtnFloat] = useState(false);
  const btnRef = useRef();
  const navigate = useNavigate();
  const { token } = useToken();
  const handleAddClick = () => {
    token
      ? noteDispatch({ type: 'DISPLAY_MODAL', payload: !displayModal })
      : navigate('/login');
  };

  const toggleFloatFun = () => {
    console.log('mew');
    if (window.pageYOffset > 50) {
      console.log('yeah');
      setBtnFloat(true);
    } else {
      setBtnFloat(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleFloatFun);
    return () => {
      window.removeEventListener('scroll', toggleFloatFun);
    };
  }, []);

  return (
    <button
      className={`add-button ${btnFloat ? 'add-btn-float' : ''}`}
      onClick={handleAddClick}
      ref={btnRef}
    >
      <span className="add-button-icon fas fa-plus-circle"></span>
    </button>
  );
};
