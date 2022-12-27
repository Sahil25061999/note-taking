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
  const { title, description, color, priority } = note;
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
            priority: 'PRIORITY_LOW',
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

  const handlePriorityChange = ({ target: { value: priority_option } }) => {
    switch (priority_option) {
      case 'PRIORITY_MEDIUM':
        return noteDispatch({ type: 'PRIORITY_MEDIUM' });

      case 'PRIORITY_HIGH':
        return noteDispatch({ type: 'PRIORITY_HIGH' });
      case 'PRIORITY_LOW':
      default:
        return noteDispatch({ type: 'PRIORITY_LOW' });
    }
  };

  return (
    <div
      className={`modal-container notes-modal-container ${
        displayModal ? 'visible' : ''
      }`}
    >
      <div
        className={`modal shadow notes-modal ${displayModal ? 'visible' : ''}`}
      >
        <button
          onClick={() => {
            noteDispatch({
              type: 'CLEAR_AFTER_ADD',
              payload: {
                note: {
                  title: '',
                  description: '',
                  color: '#ffffff',
                  priority: 'PRIORITY_LOW',
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
            errorDispatch({ type: 'NOTE_DESCRIPTION_ERROR', payload: '' });
            errorDispatch({ type: 'NOTE_TITLE_ERROR', payload: '' });
          }}
          className="btn btn-float close"
        >
          <span className="fa-solid fa-xmark"></span>
        </button>

        <form className="modal-form" onClick={(e) => e.stopPropagation()}>
          {/*                   TITLE BOX                           */}
          <div className=" form-head form-content">
            <div className="form-content title-section">
              <h3 className=" modal-title">
                Title
                <span className="error-msg"> {noteTitleError}</span>
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
            {/*                   PRIORITY SECTION              */}
            <div className="form-content priority-section">
              <h3 className=" modal-title modal-title-priority">
                <strong>Priority</strong>
              </h3>
              <ul className="priority-input-list list-style-none d-flex">
                <li
                  className={`priority-option ${
                    priority === 'PRIORITY_LOW' ? 'active' : ''
                  }`}
                >
                  <label htmlFor="priority-low">
                    <input
                      onClick={handlePriorityChange}
                      type="radio"
                      name="priortiy"
                      id="priority-low"
                      value="PRIORITY_LOW"
                    />
                    Low
                  </label>
                </li>
                <li
                  className={`priority-option ${
                    priority === 'PRIORITY_MEDIUM' ? 'active' : ''
                  }`}
                >
                  <label htmlFor="priority-medium">
                    <input
                      onClick={handlePriorityChange}
                      type="radio"
                      name="priortiy"
                      id="priority-medium"
                      value="PRIORITY_MEDIUM"
                    />
                    Medium
                  </label>
                </li>
                <li
                  className={`priority-option ${
                    priority === 'PRIORITY_HIGH' ? 'active' : ''
                  }`}
                >
                  <label htmlFor="priority-high">
                    <input
                      onClick={handlePriorityChange}
                      type="radio"
                      name="priortiy"
                      id="priority-high"
                      value="PRIORITY_HIGH"
                    />
                    High
                  </label>
                </li>
              </ul>
              {/* <select
                className="textbox priority-input"
                onChange={handlePriorityChange}
                value={priority}
              >
                <option value="PRIORITY_LOW">Low</option>
                <option value="PRIORITY_MEDIUM">Medium</option>
                <option value="PRIORITY_HIGH">High</option>
              </select> */}
            </div>
          </div>

          {/*                   Tags                           */}
          <div className="form-content tags-section">
            <h3 className=" modal-title">Tags</h3>
            <ul className="checkbox-container list-style-none d-flex">
              <li className={`tag-inputs ${work ? 'active' : ''}`}>
                <label htmlFor="work">
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
              </li>
              <li className={`tag-inputs ${homework ? 'active' : ''}`}>
                <label htmlFor="homework">
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
              </li>
              <li className={`tag-inputs ${exercise ? 'active' : ''}`}>
                <label htmlFor="exercise">
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
              </li>
              <li className={`tag-inputs ${creative ? 'active' : ''}`}>
                <label htmlFor="creative">
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
              </li>
            </ul>
          </div>
          {/*                   Description BOX                           */}
          <div className="form-content description-section">
            <h3 className=" modal-description">
              Description
              <span className="error-msg"> {noteDescriptionError}</span>
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
          <div className="form-bottom d-flex notes-modal-bottom-container">
            <button
              className="btn btn-primary margin-r-10"
              onClick={handleAddNote}
            >
              {editId ? 'Save' : 'Add'}
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
  );
};
