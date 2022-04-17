import React, { useState, createContext, useContext, useEffect } from 'react';

const DeleteList = createContext();

export const DeleteListProvider = ({ children }) => {
  const [deleteList, setDeleteList] = useState([]);

  useEffect(() => {
    const deleteListFromLocal = localStorage.getItem('deleted_items');

    if (deleteListFromLocal) {
      setDeleteList(JSON.parse(deleteListFromLocal));
    }
  }, []);
  return (
    <DeleteList.Provider value={{ setDeleteList, deleteList }}>
      {children}
    </DeleteList.Provider>
  );
};

export const useDeleteList = () => useContext(DeleteList);
