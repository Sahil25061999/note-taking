import { useState } from 'react';
import { useFilter } from '../../context/context-index';
import './Filter.css';
const Filter = () => {
  const { sortByState, priorityState, tagState, filterDispatch } = useFilter();

  const { work, exercise, homework, creative } = tagState;
  const [checklist_visible, setChecklistVisible] = useState(false);
  const [dateSort_visible, setDateSortVisible] = useState(false);
  const [prioritySort_visible, setPrioritySortVisible] = useState(false);

  const handleClearBtn = (e) => {
    e.preventDefault();
    filterDispatch({
      type: 'CLEAR',
      payload: {
        sortByState: null,
        priorityState: null,
        tagState: {
          work: false,
          homework: false,
          creative: false,
          exercise: false,
        },
      },
    });
  };

  const handleSelect = (e) => {
    switch (e.target.value) {
      case 'Date ascending':
        return filterDispatch({
          type: 'DATE_ASC',
          payload: 'DATE_ASC',
        });
        break;
      case 'Date descending':
        return filterDispatch({
          type: 'DATE_DESC',
          payload: 'DATE_DESC',
        });

      default:
        return;
    }
  };

  const handlePrioritySelect = ({ target: { value: priority } }) => {
    switch (priority) {
      case 'priority_low':
        return filterDispatch({ type: 'PRIORITY_LOW_FILTER' });

      case 'priority_medium':
        return filterDispatch({ type: 'PRIORITY_MEDIUM_FILTER' });
      case 'priority_high':
        return filterDispatch({ type: 'PRIORITY_HIGH_FILTER' });
      default:
        return;
    }
  };

  return (
    <aside className="filter-section">
      <button
        className="btn filter-btn"
        onClick={() => filterDispatch({ type: 'DISPLAY_FILTER_MODAL' })}
      >
        <span className="fa-solid fa-sliders margin-r-10"></span>
        Filter
      </button>
    </aside>
  );
};

export { Filter };
