import React from 'react';
import { NoteCard } from '../../component/component-index';
import { useDeleteList } from '../../context/context-index';
import Nodata from '../../assets/image/No data-cuate.svg';
export const Delete = () => {
  const { deleteList } = useDeleteList();

  return (
    <div className="main-page">
      <main>
        {deleteList && deleteList.length !== 0 ? (
          deleteList.map((item) => {
            return <NoteCard key={item._id} item={item} label={true} />;
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
