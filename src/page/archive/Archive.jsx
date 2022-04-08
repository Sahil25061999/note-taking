import React from 'react';
import { useArchivesList } from '../../context/context-index';

import './Archive.css';
import { NoteCard } from '../../component/component-index';

export const Archive = () => {
  const { archivesList } = useArchivesList();

  return (
    <div className="main-page">
      <main>
        {archivesList.length !== 0 ? (
          archivesList.map((item) => {
            return <NoteCard key={item._id} item={item} archive={true} />;
          })
        ) : (
          <h2>No data archived</h2>
        )}
      </main>
    </div>
  );
};
