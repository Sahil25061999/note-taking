import React from 'react';
import { useArchivesList } from '../../context/context-index';
import Lottie from 'react-lottie';
import animationData from '../../assets/lottie-animation/empty-list';
import Nodata from '../../assets/image/No data-cuate.svg';

import './Archive.css';
import { NoteCard } from '../../component/component-index';

export const Archive = () => {
  const { archivesList } = useArchivesList();
  const lottieOption = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="main-page">
      <main>
        {archivesList.length !== 0 ? (
          archivesList.map((item) => {
            return <NoteCard key={item._id} item={item} archive={true} />;
          })
        ) : (
          // <Lottie options={lottieOption} height={400} width={400} />
          <div className="empty-list-image">
            <img src={Nodata} alt="list image" />
          </div>
        )}
      </main>
    </div>
  );
};
