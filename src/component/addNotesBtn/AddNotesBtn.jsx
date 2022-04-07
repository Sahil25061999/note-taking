import React from 'react';
import './AddNotesBtn.css';
import { useNoteInputContext } from '../../context/context-index';

export const AddNoteBtn = () => {
  const { displayModal, noteDispatch } = useNoteInputContext();
  const handleAddClick = () => {
    noteDispatch({ type: 'DISPLAY_MODAL', payload: !displayModal });
  };
  return (
    <button className="add-button" onClick={handleAddClick}>
      <span className="add-button-icon fas fa-plus-circle"></span>
    </button>
  );
};
