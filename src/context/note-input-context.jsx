import React, { useReducer, createContext, useContext } from 'react';

const NoteInputContext = createContext();

const reducerFunc = (state, action) => {
  switch (action.type) {
    case 'TITLE':
      return { ...state, note: { ...state.note, title: action.payload } };
    case 'DESCRIPTION':
      return { ...state, note: { ...state.note, description: action.payload } };
    case 'COLOR':
      return { ...state, note: { ...state.note, color: action.payload } };

    /*                       CATEGORIES                            */
    case 'WORK':
      return {
        ...state,
        note: {
          ...state.note,
          tags: { ...state.note.tags, work: !state.note.tags.work },
        },
      };
    case 'HOMEWORK':
      return {
        ...state,
        note: {
          ...state.note,
          tags: { ...state.note.tags, homework: !state.note.tags.homework },
        },
      };
    case 'CREATIVE':
      return {
        ...state,
        note: {
          ...state.note,
          tags: { ...state.note.tags, creative: !state.note.tags.creative },
        },
      };
    case 'EXERCISE':
      return {
        ...state,
        note: {
          ...state.note,
          tags: { ...state.note.tags, exercise: !state.note.tags.exercise },
        },
      };

    /*                          PRIORITY                              */

    case 'PRIORITY_LOW':
      return {
        ...state,
        note: {
          ...state.note,
          priority: 'PRIORITY_LOW',
        },
      };
    case 'PRIORITY_MEDIUM':
      return {
        ...state,
        note: {
          ...state.note,
          priority: 'PRIORITY_MEDIUM',
        },
      };
    case 'PRIORITY_HIGH':
      return {
        ...state,
        note: {
          ...state.note,
          priority: 'PRIORITY_HIGH',
        },
      };

    case 'DISPLAY_MODAL':
      return { ...state, displayModal: action.payload };
    case 'CLEAR_AFTER_ADD':
      return action.payload;

    default:
      return state;
  }
};

export const NoteInputProvider = ({ children }) => {
  const [{ note, displayModal, editId }, noteDispatch] = useReducer(
    reducerFunc,
    {
      note: {
        title: '',
        description: '',
        color: '#ffffff',
        priority: '',
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
    }
  );

  return (
    <NoteInputContext.Provider
      value={{ note, displayModal, noteDispatch, editId }}
    >
      {children}
    </NoteInputContext.Provider>
  );
};

export const useNoteInputContext = () => useContext(NoteInputContext);
