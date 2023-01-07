import { createContext, useContext, useReducer } from 'react';

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const reducerFunc = (state, action) => {
    switch (action.type) {
      case 'DISPLAY_FILTER_MODAL':
        return { ...state, displayFilterModal: !state.displayFilterModal };

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

      /*                Priortiy Filter                              */

      case 'PRIORITY_LOW_FILTER':
        return { ...state, priorityState: action.payload };
      case 'PRIORITY_MEDIUM_FILTER':
        return { ...state, priorityState: action.payload };
      case 'PRIORITY_HIGH_FILTER':
        return { ...state, priorityState: action.payload };

      default:
        return state;
    }
  };

  const [
    { displayFilterModal, sortByState, priorityState, tagState },
    filterDispatch,
  ] = useReducer(reducerFunc, {
    displayFilterModal: false,
    sortByState: null,
    priorityState: null,
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
        displayFilterModal,
        sortByState,
        priorityState,
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
