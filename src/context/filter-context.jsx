import { createContext, useContext, useReducer } from 'react';

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const reducerFunc = (state, action) => {
    switch (action.type) {
      case 'CLEAR':
        return (state = action.payload);

      /*            Categories   filter                                  */
      case 'WORK_FILTER':
        return {
          ...state,
          tagState: {
            ...state.tagState,
            work: !state.tagState.work,
          },
        };
      case 'HOMEWORK_FILTER':
        return {
          ...state,
          tagState: {
            ...state.tagState,
            homework: !state.tagState.homework,
          },
        };
      case 'CREATIVE_FILTER':
        return {
          ...state,
          tagState: {
            ...state.tagState,
            creative: !state.tagState.creative,
          },
        };
      case 'EXERCISE_FILTER':
        return {
          ...state,
          tagState: {
            ...state.tagState,
            exercise: !state.tagState.exercise,
          },
        };

      /*                Sort Filter                              */
      case 'DATE_ASC':
        return { ...state, sortByState: action.payload };
      case 'DATE_DESC':
        return { ...state, sortByState: action.payload };

      default:
        return state;
    }
  };

  const [{ sortByState, tagState }, filterDispatch] = useReducer(reducerFunc, {
    sortByState: null,
    tagState: {
      work: false,
      homework: false,
      exercise: false,
      creative: false,
    },
  });

  return (
    <FilterContext.Provider
      value={{
        sortByState,
        tagState,
        filterDispatch,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => useContext(FilterContext);

export { FilterProvider, useFilter };
