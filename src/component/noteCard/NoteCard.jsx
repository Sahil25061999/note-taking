import React, { useEffect } from 'react';
import axios from 'axios';
import './NoteCard.css';

import {
  useNoteInputContext,
  useNotesList,
  useToken,
} from '../../context/context-index';

export const NoteCard = ({ item, archive }) => {
  const { _id: id, title, description, color } = item;
  const { token } = useToken();
  const { setNotesList } = useNotesList();

  const { note, displayModal, noteDispatch } = useNoteInputContext();

  useEffect(() => {}, [displayModal]);

  //delete
  const handleDelete = async () => {
    const deletResponse = await axios.delete(`/api/notes/${id}`, {
      headers: { authorization: token },
    });
    if (deletResponse.status === 200 || deletResponse === 201) {
      setNotesList([...deletResponse.data.notes]);
    }
  };

  //archive
  const handleArchive = async () => {};

  const handleEdit = async () => {};

  return (
    <div
      style={{ backgroundColor: color }}
      class="card card-only-text note-card"
    >
      <div class="card-head">
        <h3 class="card-heading d-flex">
          {title}
          {Object.keys(item.tags)
            .filter((catKey) => item.tags[catKey])
            .map((badge) => (
              <span class="badge-text badge-sm badge-accent">{badge}</span>
            ))}
        </h3>
        <div class="card-content card-description-section">
          <p>{description}</p>
        </div>
      </div>

      <div className="card-foot note-editing-option">
        <button
          className="btn btn-only-icon note-delete"
          onClick={handleDelete}
        >
          <span className="fa-solid fa-trash"></span>
        </button>
        <button
          className="btn btn-only-icon note-archive"
          onClick={handleArchive}
        >
          <span className="fa-solid fa-box"></span>
        </button>
        <button className="btn btn-only-icon note-edit" onClick={handleEdit}>
          <span className="fa-solid fa-pencil"></span>
        </button>
      </div>
    </div>
  );
};
