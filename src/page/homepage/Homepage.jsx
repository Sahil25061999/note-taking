import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  AddNoteBtn,
  NoteCard,
  NotesInputModal,
} from '../../component/component-index';
import { useToken, useNotesList } from '../../context/context-index';
import './Homepage.css';

export const HomePage = () => {
  const { notesList, setNotesList } = useNotesList();
  const { token } = useToken();
  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/notes', {
        headers: { authorization: token },
      });
      if (response.status === 200 || response.status === 201) {
        setNotesList([...response.data.notes]);
      }
    })();
  }, []);
  return (
    <div className="main-page">
      <main>
        <AddNoteBtn />
        <NotesInputModal />
        <div className="notes-section">
          {notesList.map((item) => (
            <NoteCard key={item._id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
};
