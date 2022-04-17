import React, { useContext, createContext, useState } from 'react';
import { useEffect } from 'react';
import { useToken } from '../context/context-index';
import { getArchive } from '../api-call/api-index';
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
