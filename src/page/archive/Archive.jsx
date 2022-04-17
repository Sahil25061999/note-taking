import React, { useEffect } from 'react';
import { useArchivesList, useToken } from '../../context/context-index';
import Nodata from '../../assets/image/No data-cuate.svg';
import './Archive.css';
import { NoteCard } from '../../component/component-index';
import { getArchive } from '../../api-call/api-index';
export const Archive = () => {
  const { archivesList } = useArchivesList();
  const { token } = useToken();
  useEffect(() => {
    (async () => {
      console.log('called');
      const archiveResponse = await getArchive(token);
      if (archiveResponse) {
        setArchivesList(archiveResponse);
      }
    })();
  }, []);

  return (
    <div className="main-page">
      <main>
        {archivesList.length !== 0 ? (
          archivesList.map((item) => {
            return <NoteCard key={item._id} item={item} archive={true} />;
          })
        ) : (
          <div className="empty-list-image">
            <img src={Nodata} alt="list image" />
          </div>
        )}
      </main>
    </div>
  );
};
