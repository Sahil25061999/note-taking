export const getTagData = (dataList, tagState) => {
  const data = [];
  //check the active category from tagState
  Object.entries(tagState).forEach(([tagName, tagActive]) => {
    // check the note tag matches the active tag
    data.push(
      ...dataList.filter(({ tags }) => {
        return tagActive ? tags[tagName] : false;
      })
    );
  });

  //check if data is empty
  if (!data.length) {
    // if data empty is true, check if any category is active
    const tagIsActive = Object.values(tagState).every((item) => {
      return item === false;
    });

    if (!tagIsActive) {
      return [];
    }
    // since data empty is true and no category is active return categoryDatalist(original data without any filter)

    return dataList;
  }

  return data;
};
