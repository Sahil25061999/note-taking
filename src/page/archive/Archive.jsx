import React from 'react';
import { useArchivesList } from '../../context/context-index';
import Nodata from '../../assets/image/No data-cuate.svg';
import './Archive.css';
import { NoteCard, SideNav } from '../../component/component-index';
import { useDocumentTitle } from '../../hook/useDocumentTilte';

export const Archive = () => {
  const { archivesList } = useArchivesList();

  useDocumentTitle('Archive | Take Notes');

  return (
    <>
      <SideNav />
      <div className="main-page">
        <main>
          {archivesList.length !== 0 ? (
            archivesList.map((item) => {
              return <NoteCard key={item._id} item={item} archive={true} />;
            })
          ) : (
            <div className="empty-list-image">
              <img src={Nodata} alt="list" />
            </div>
          )}
        </main>
      </div>
    </>
  );
};
