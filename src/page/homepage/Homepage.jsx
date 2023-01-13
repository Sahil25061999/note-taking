import React, { useEffect, useState, useRef } from 'react';
import {
  AddNoteBtn,
  Filter,
  FilterModal,
  NoteCard,
  NotesInputModal,
  SideNav,
} from '../../component/component-index';
import { useToken, useNotesList, useFilter } from '../../context/context-index';
import {
  getTagData,
  getSortedData,
  getPriorityData,
} from '../../utilities/utilities-index';
import './Homepage.css';
import { getNote } from '../../api-call/api-index';
import { useDocumentTitle } from '../../hook/useDocumentTilte';

export const HomePage = () => {
  const [addBtnRef, setBtnRef] = useState();
  const [btnFloat, setBtnFloat] = useState(false);
  const { notesList, setNotesList } = useNotesList();
  const { tagState, priorityState, sortByState } = useFilter();
  const { work, exercise, homework, creative } = tagState;

  const { token } = useToken();
  const mainPageRef = useRef();

  useEffect(() => {
    (async () => {
      const response = await getNote(token);
      if (response.status === 200 || response.status === 201) {
        setNotesList([...response.data.notes].reverse());
      }
    })();
  }, []);

  const getFilteredData = (cardData, { getTagData, getSortedData }) => {
    const dataFromTag = getTagData(cardData, tagState);
    const dataFromPriority = getPriorityData(dataFromTag, priorityState);

    const dataFromSort = getSortedData(dataFromPriority, sortByState);

    return dataFromSort.length !== 0 ? dataFromSort : undefined;
  };

  const filteredList = getFilteredData(notesList, {
    getTagData,
    getSortedData,
  });

  useDocumentTitle('Take Notes');

  const getBtnRef = (btnRef) => {
    setBtnRef(btnRef);
  };

  return (
    <>
      <SideNav />
      <div
        className="main-page"
        ref={mainPageRef}
        onScroll={() => {
          console.log(mainPageRef.current.scrollTop);
          // if (addBtnRef.current.getBoundingClientRect().y <= -300) {
          //   setBtnFloat(true);
          // } else {
          //   setBtnFloat(false);
          // }
          if (mainPageRef.current.scrollTop > 300) {
            setBtnFloat(true);
          } else {
            setBtnFloat(false);
          }
        }}
      >
        <main>
          {/* <div className="d-flex home-head"> */}
          <AddNoteBtn getBtnRef={getBtnRef} btnFloat={btnFloat} />
          {/* </div> */}
          <div
            className="notes-info-section d-flex"
            style={{ marginTop: `${btnFloat ? '15rem' : '0'}` }}
          >
            <Filter />
          </div>
          <NotesInputModal />
          <FilterModal />
          <div className="notes-section">
            {filteredList?.length &&
              filteredList.map((item) => (
                <NoteCard key={item._id} item={item} />
              ))}
          </div>
        </main>
      </div>
    </>
  );
};
