import React, { useContext, createContext } from 'react';
import { useState } from 'react';

const ArchivesListContext = createContext(null);

const ArchivesListProvider = ({ children }) => {
  const [archivesList, setArchivesList] = useState([]);

  return (
    <ArchivesListContext.Provider value={{ archivesList, setArchivesList }}>
      {children}
    </ArchivesListContext.Provider>
  );
};

const useArchivesList = () => useContext(ArchivesListContext);

export { useArchivesList, ArchivesListProvider };
