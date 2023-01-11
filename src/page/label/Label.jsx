import React, { useEffect, useState } from 'react';
import { NoteCard, SideNav } from '../../component/component-index';
import { useFilter } from '../../context/filter-context';
import { useNotesList } from '../../context/notes-list-context';
import Nodata from '../../assets/image/No data-cuate.svg';
import { useDocumentTitle } from '../../hook/useDocumentTilte';

export const Label = () => {
  const { tagState } = useFilter();
  const { notesList } = useNotesList();
  const [labelList, setLabelList] = useState({});

  useEffect(() => {
    const obj = {};
    for (const currtag in tagState) {
      obj[currtag] = [];
      for (const item of notesList) {
        if (item.tags[currtag]) {
          obj[currtag].push(item);
        }
      }
    }
    setLabelList({ ...labelList, ...obj });
  }, []);
  useDocumentTitle('Labels | Take Notes');

  return (
    <>
      <SideNav />
      <div className="main-page">
        <main>
          {Object.entries(labelList).map(([key, value]) => {
            if (!value.length) {
              return;
            }
            return (
              <>
                <h2>{key}</h2>
                <div>
                  {value.map((item) => {
                    if (item) {
                      return (
                        <NoteCard key={item._id} item={item} label={true} />
                      );
                    }
                  })}
                </div>
              </>
            );
          })}
        </main>
      </div>
    </>
  );
};
