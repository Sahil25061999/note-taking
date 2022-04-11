import React, { useEffect } from 'react';
import axios from 'axios';
import './NoteCard.css';

import {
  useNoteInputContext,
  useNotesList,
  useToken,
  useArchivesList,
} from '../../context/context-index';
import {
  deleteNote,
  postArchive,
  deleteArchive,
  postArchiveRestore,
} from '../../api-call/api-index';

export const NoteCard = ({ item, archive }) => {
  const { _id: id, title, description, color, createdAt } = item;
  const { token } = useToken();
  const { setNotesList } = useNotesList();

  const { note, displayModal, noteDispatch } = useNoteInputContext();
  const { archivesList, setArchivesList } = useArchivesList();

  //delete
  const handleDelete = async () => {
    const deletResponse = await deleteNote(id, token);
    if (deletResponse.status === 200 || deletResponse === 201) {
      setNotesList([...deletResponse.data.notes]);
    }
  };

  //archive
  const handleArchive = async () => {
    const archiveResponse = await postArchive(id, item, token);
    if (archiveResponse.status === 200 || archiveResponse.status === 201) {
      setArchivesList([...archiveResponse.data.archives]);
      setNotesList([...archiveResponse.data.notes]);
    }
  };

  //archive delete
  const handleDeleteArchive = async () => {
    const delArchResponse = await deleteArchive(id, token);
    if (delArchResponse.status === 200 || delArchResponse.status === 201) {
      setArchivesList([...delArchResponse.data.archives]);
    }
  };

  //restore archive
  const handleArchiveRestore = async () => {
    const restoreArchRes = await postArchiveRestore(id, item, token);
    if (restoreArchRes.status === 200 || restoreArchRes.status === 201) {
      setArchivesList([...restoreArchRes.data.archives]);
      setNotesList([...restoreArchRes.data.notes]);
    }
  };

  const handleEdit = () => {
    noteDispatch({
      type: 'CLEAR_AFTER_ADD',
      payload: {
        note: {
          title: title,
          description: description,
          color: color,
          tags: item.tags,
        },
        displayModal: true,
        editId: id,
      },
    });
  };

  return (
    <div
      style={{ backgroundColor: color }}
      className="card card-only-text note-card"
    >
      <div className="card-head">
        <h3 className="card-heading d-flex">
          {title} <span className="margin-l-5 badge-sm"> {createdAt}</span>
          {Object.keys(item.tags)
            .filter((catKey) => item.tags[catKey])
            .map((badge) => (
              <span key={badge} className="badge-text badge-sm badge-accent">
                {badge}
              </span>
            ))}
        </h3>
        <div className="card-content card-description-section">
          <p>{description}</p>
        </div>
      </div>

      <div className="card-foot note-editing-option">
        <button
          className="btn btn-only-icon note-delete"
          onClick={archive ? handleDeleteArchive : handleDelete}
        >
          <span className="fa-solid fa-trash"></span>
        </button>
        <button
          className="btn btn-only-icon note-archive"
          onClick={archive ? handleArchiveRestore : handleArchive}
        >
          <span
            className={`fa-solid ${archive ? 'fa-box-open' : 'fa-box'} `}
          ></span>
        </button>
        {!archive && (
          <button className="btn btn-only-icon note-edit" onClick={handleEdit}>
            <span className="fa-solid fa-pencil"></span>
          </button>
        )}
      </div>
    </div>
  );
};
