import React, { useContext, createContext } from 'react';
import { useState } from 'react';
import { useToken } from './context-index';

const NotesListContext = createContext(null);

const NotesListProvider = ({ children }) => {
  const [notesList, setNotesList] = useState([]);

  return (
    <NotesListContext.Provider value={{ notesList, setNotesList }}>
      {children}
    </NotesListContext.Provider>
  );
};

const useNotesList = () => useContext(NotesListContext);

export { useNotesList, NotesListProvider };
