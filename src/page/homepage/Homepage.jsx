import React, { useEffect, useState } from 'react';
import {
  AddNoteBtn,
  Filter,
  NoteCard,
  NotesInputModal,
} from '../../component/component-index';
import { useToken, useNotesList, useFilter } from '../../context/context-index';
import { getTagData, getSortedData } from '../../utilities/utilities-index';
import './Homepage.css';
import { getNote } from '../../api-call/api-index';

export const HomePage = () => {
  const { notesList, setNotesList } = useNotesList();
  const { tagState, sortByState } = useFilter();
  const { token } = useToken();
  useEffect(() => {
    (async () => {
      const response = await getNote(token);
      if (response.status === 200 || response.status === 201) {
        setNotesList([...response.data.notes]);
      }
    })();
  }, []);

  const getFilteredData = (cardData, { getTagData, getSortedData }) => {
    const dataFromTag = getTagData(cardData, tagState);

    const dataFromSort = getSortedData(dataFromTag, sortByState);

    return dataFromSort.length !== 0 ? dataFromSort : undefined;
  };

  const filteredList = getFilteredData(notesList, {
    getTagData,
    getSortedData,
  });

  return (
    <div className="main-page">
      <main>
        <div className="d-flex home-head">
          <Filter />
          <AddNoteBtn />
        </div>
        <NotesInputModal />
        <div className="notes-section">
          {filteredList &&
            filteredList.length &&
            filteredList.map((item) => <NoteCard key={item._id} item={item} />)}
        </div>
      </main>
    </div>
  );
};
