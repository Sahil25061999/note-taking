import React, { useContext, createContext, useEffect } from 'react';
import { useState } from 'react';
import { getNote } from '../api-call/api-index';
import { useToken } from './context-index';

const NotesListContext = createContext(null);

const NotesListProvider = ({ children }) => {
  const [notesList, setNotesList] = useState([]);
  // const { token } = useToken();
  // useEffect(() => {
  //   (async () => {
  //     const noteResponse = await getNote(token);
  //     setNotesList([...noteResponse.data.notes].reverse());
  //   })();
  // }, []);
  // console.log(notesList);
  return (
    <NotesListContext.Provider value={{ notesList, setNotesList }}>
      {children}
    </NotesListContext.Provider>
  );
};

const useNotesList = () => useContext(NotesListContext);

export { useNotesList, NotesListProvider };
