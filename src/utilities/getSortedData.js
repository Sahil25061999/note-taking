const getSortedData = (dataList, sortBy) => {
  if (sortBy === 'DATE_ASC') {
    return [...dataList].sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  }
  if (sortBy === 'DATE_DESC') {
    return [...dataList].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  return dataList;
};

export { getSortedData };
