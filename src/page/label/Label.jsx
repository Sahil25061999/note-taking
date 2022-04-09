import React from 'react';
import { NoteCard } from '../../component/component-index';
import { useFilter } from '../../context/filter-context';
import { useNotesList } from '../../context/notes-list-context';

export const Label = () => {
  const { tagState } = useFilter();
  const { notesList } = useNotesList();
  const labelList = [];
  Object.keys(tagState).forEach((currtag) => {
    const obj = {};
    obj[currtag] = notesList.map((item) => {
      if (item.tags[currtag]) {
        return item;
      }
    });
    labelList.push(obj);
  });

  return (
    <div className="main-page">
      <main>
        {/* {Object.keys(tagState).forEach((currtag) => {
          <p>{currtag}</p>; 
            notesList.map((item) => {
               currtag === item.tags[currtag] ? (
                 <NoteCard key={item._id} item={item} />
              ) : (
                 ''
               );
             });
         })} */}
        {labelList.map((item) => {
          return Object.entries(item).map((key, value) => {
            return (
              <>
                <h2>{key}</h2>;
                <div>
                  {value.map((item) => (
                    <NoteCard key={item._id} item={item} />
                  ))}
                </div>
              </>
            );
          });
        })}
      </main>
    </div>
  );
};
