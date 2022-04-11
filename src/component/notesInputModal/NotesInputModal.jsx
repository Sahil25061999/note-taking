import React from 'react';
import {
  useNotesList,
  useNoteInputContext,
  useToken,
} from '../../context/context-index';
import './NotesInputModal.css';
import { postNote } from '../../api-call/api-index';
import { useError } from '../../reducer/useError';

export const NotesInputModal = () => {
  const { note, displayModal, noteDispatch, editId } = useNoteInputContext();
  const { title, description, color } = note;
  const { token } = useToken();
  const { setNotesList } = useNotesList();
  const { work, exercise, homework, creative } = note.tags;
  const [{ noteTitleError, noteDescriptionError }, errorDispatch] = useError();

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (title.length === 0) {
      errorDispatch({
        type: 'NOTE_TITLE_ERROR',
        payload: 'please enter a title',
      });
      return;
    }
    if (description.length === 0) {
      errorDispatch({
        type: 'NOTE_DESCRIPTION_ERROR',
        payload: 'please enter a description',
      });
      return;
    }
    errorDispatch({ type: 'NOTE_DESCRIPTION_ERROR', payload: '' });
    errorDispatch({ type: 'NOTE_TITLE_ERROR', payload: '' });

    const noteResponse = await postNote(editId, note, token);
    if (noteResponse.status === 200 || noteResponse.status === 201) {
      setNotesList([...noteResponse.data.notes].reverse());
      noteDispatch({
        type: 'CLEAR_AFTER_ADD',
        payload: {
          note: {
            title: '',
            description: '',
            color: '#ffffff',
            tags: {
              work: false,
              homework: false,
              creative: false,
              exercise: false,
            },
            createdAt: '',
          },
          displayModal: false,
          editId: '',
        },
      });
    }
  };

  return displayModal ? (
    <div className="modal-container notes-modal-container">
      <div className="modal shadow notes-modal ">
        <button
          onClick={() => {
            noteDispatch({
              type: 'CLEAR_AFTER_ADD',
              payload: {
                note: {
                  title: '',
                  description: '',
                  color: '#ffffff',
                  tags: {
                    work: false,
                    homework: false,
                    creative: false,
                    exercise: false,
                  },
                  createdAt: '',
                },
                displayModal: false,
                editId: '',
              },
            });
          }}
          className="btn btn-float close"
        >
          <span className="fa-solid fa-xmark"></span>
        </button>

        <form className="modal-form" onClick={(e) => e.stopPropagation()}>
          {/*                   TITLE BOX                           */}
          <div className="form-content">
            <h3 className="text-left modal-title">
              <label htmlFor="title">
                <strong>Title</strong>
                <span className="error-msg"> {noteTitleError}</span>
              </label>
            </h3>
            <input
              onChange={(e) =>
                noteDispatch({ type: 'TITLE', payload: e.target.value })
              }
              className="textbox modal-input-title"
              id="title"
              type="text"
              placeholder="Enter a Title"
              value={title}
            />
          </div>

          {/*                   Tags                           */}
          <div className="form-content tags">
            <h4 className="text-left modal-title">
              <label htmlFor="title">
                <strong>Tags</strong>
              </label>
            </h4>
            <div className="checkbox-container">
              <label className="margin-r-10">
                <input
                  name="work"
                  className="checkbox "
                  id="work"
                  type="checkbox"
                  checked={work}
                  onChange={() => {
                    noteDispatch({ type: 'WORK' });
                  }}
                  value="work"
                />
                Work
              </label>
              <label className="margin-r-10">
                <input
                  className="checkbox "
                  id="homework"
                  name="homework"
                  type="checkbox"
                  checked={homework}
                  onChange={() => {
                    noteDispatch({ type: 'HOMEWORK' });
                  }}
                  value="homework"
                />
                Homework
              </label>
              <label className="margin-r-10">
                <input
                  className="checkbox "
                  id="exercise"
                  name="exercise"
                  type="checkbox"
                  checked={exercise}
                  onChange={() => {
                    noteDispatch({ type: 'EXERCISE' });
                  }}
                  value="exercise"
                />
                Exercise
              </label>
              <label className="margin-r-10">
                <input
                  className="checkbox"
                  id="creative"
                  name="creative"
                  type="checkbox"
                  checked={creative}
                  onChange={() => {
                    noteDispatch({ type: 'CREATIVE' });
                  }}
                  value="creative"
                />
                Creative
              </label>
            </div>
          </div>
          {/*                   Description BOX                           */}
          <div className="form-content">
            <h3 className="text-left modal-description">
              <label htmlFor="description">
                <strong>Description</strong>
                <span className="error-msg"> {noteDescriptionError}</span>
              </label>
            </h3>
            <textarea
              onChange={(e) =>
                noteDispatch({ type: 'DESCRIPTION', payload: e.target.value })
              }
              className="textbox textbox-area modal-input-textarea"
              id="description"
              value={description}
            ></textarea>
          </div>
          {/*                   Button BOX                           */}
          <div className="form-bottom">
            <button
              className="btn btn-primary margin-r-10"
              onClick={handleAddNote}
            >
              Add
            </button>
            <div className="color-container">
              <input
                className="color-selector"
                onChange={(e) =>
                  noteDispatch({ type: 'COLOR', payload: e.target.value })
                }
                type="color"
                value={color}
              />
              <span className="fas fa-palette color-icon"></span>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};
