import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AddNoteBtn } from '../../component/addNotesBtn/AddNotesBtn';
import { useToken } from '../../context/token-context';

export const HomePage = () => {
  const [notesList, setNotesList] = useState([]);
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
        <div className="notes-section"></div>
      </main>
    </div>
  );
};
