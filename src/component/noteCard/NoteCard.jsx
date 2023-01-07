import React, { useEffect } from 'react';

import './NoteCard.css';

import {
  useNoteInputContext,
  useNotesList,
  useToken,
  useArchivesList,
  useDeleteList,
} from '../../context/context-index';
import {
  deleteNote,
  postArchive,
  deleteArchive,
  postArchiveRestore,
} from '../../api-call/api-index';

export const NoteCard = ({ item, archive, label }) => {
  const { _id: id, title, description, color, priority, createdAt } = item;
  const { token } = useToken();
  const { setNotesList } = useNotesList();
  const { deleteList, setDeleteList } = useDeleteList();
  const { noteDispatch } = useNoteInputContext();
  const { setArchivesList } = useArchivesList();

  //delete
  const handleDelete = async () => {
    const deletResponse = await deleteNote(id, token);
    if (deletResponse.status === 200 || deletResponse === 201) {
      setNotesList([...deletResponse.data.notes]);

      setDeleteList([...deleteList, item]);
    }
  };

  //archive
  const handleArchive = async () => {
    const archiveResponse = await postArchive(id, item, token);
    if (archiveResponse.status === 200 || archiveResponse.status === 201) {
      setArchivesList([...archiveResponse.data.archives]);
      setNotesList([...archiveResponse.data.notes].reverse());
    }
  };

  //archive delete
  const handleDeleteArchive = async () => {
    const delArchResponse = await deleteArchive(id, token);
    if (delArchResponse.status === 200 || delArchResponse.status === 201) {
      setArchivesList([...delArchResponse.data.archives]);
      setDeleteList([...deleteList, item]);
    }
  };

  //restore archive
  const handleArchiveRestore = async () => {
    const restoreArchRes = await postArchiveRestore(id, item, token);
    if (restoreArchRes.status === 200 || restoreArchRes.status === 201) {
      setArchivesList([...restoreArchRes.data.archives]);
      setNotesList([...restoreArchRes.data.notes].reverse());
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
          priority: priority,
          tags: item.tags,
        },
        displayModal: true,
        editId: id,
      },
    });
  };

  useEffect(() => {
    localStorage.setItem('deleted_items', JSON.stringify(deleteList));
  }, [deleteList]);

  return (
    <div
      style={{ backgroundColor: color }}
      className="card card-only-text note-card"
    >
      <div className="card-head">
        <div className="card-heading d-flex">
          <h3>{title}</h3>
          <div className="badge-container">
            {Object.keys(item.tags)
              .filter((catKey) => item.tags[catKey])
              .map((badge) => {
                console.log(badge.length);
                return (
                  <span
                    key={badge}
                    className="badge-text badge-sm badge-category"
                  >
                    {badge.toUpperCase()}
                  </span>
                );
              })}
            {priority.length ? (
              <span className="badge-text badge-sm badge-priority">
                {priority.slice(9)}
              </span>
            ) : null}
          </div>
        </div>
        <p className="badge-sm date-text"> {createdAt.slice(0, 10)} </p>
        <div className="margin-t-5 card-content card-description-section">
          <p>{description}</p>
        </div>
      </div>
      {!label && (
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
            <button
              className="btn btn-only-icon note-edit"
              onClick={handleEdit}
            >
              <span className="fa-solid fa-pencil"></span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
