import React, { useEffect } from 'react';

export const useDocumentTitle = (title, dependency = null) => {
  useEffect(() => {
    document.title = title;
  }, [dependency]);
};
