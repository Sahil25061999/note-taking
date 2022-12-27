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
      <form className="filter-container" action="">
        <div className="filter-elements filter-category-element">
          <div className="checklist-container filter-input-element">
            <button
              className="checklist-btn filter-btn btn"
              onClick={(e) => {
                e.preventDefault();
                setChecklistVisible(!checklist_visible);
                setDateSortVisible(false);
                setPrioritySortVisible(false);
              }}
            >
              <span className="fa-solid fa-tags"></span>
            </button>
            <ul
              className={`filter-list checkbox-list list-style-none ${
                checklist_visible ? 'visible' : ''
              }`}
            >
              <li>
                <label className="margin-b-5">
                  <input
                    type="checkbox"
                    onChange={() => {
                      filterDispatch({ type: 'WORK_FILTER' });
                    }}
                    id="work"
                    name="work"
                    value="work"
                    checked={work}
                  />
                  Work
                </label>
              </li>
              <li>
                <label className="margin-b-5">
                  <input
                    type="checkbox"
                    onChange={() => {
                      filterDispatch({ type: 'HOMEWORK_FILTER' });
                    }}
                    id="homework"
                    name="homework"
                    value="homework"
                    checked={homework}
                  />
                  Homework
                </label>
              </li>
              <li>
                {' '}
                <label className="margin-b-5">
                  <input
                    type="checkbox"
                    onChange={() => {
                      filterDispatch({ type: 'CREATIVE_FILTER' });
                    }}
                    id="creative"
                    name="creative"
                    value="creative"
                    checked={creative}
                  />
                  Creative
                </label>
              </li>
              <li>
                <label className="margin-b-5">
                  <input
                    type="checkbox"
                    onChange={() => {
                      filterDispatch({ type: 'EXERCISE_FILTER' });
                    }}
                    id="exercise"
                    name="exercise"
                    value="exercise"
                    checked={exercise}
                  />
                  Exercise
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className="filter-elements filter-sort-element">
          <div className="date-sort-container filter-input-elements">
            <button
              className="date-btn filter-btn btn"
              onClick={(e) => {
                e.preventDefault();
                setDateSortVisible(!dateSort_visible);
                setChecklistVisible(false);
                setPrioritySortVisible(false);
              }}
            >
              <span className="fa-solid fa-arrow-up-short-wide"></span>
            </button>
            <ul
              className={`filter-list date-sort-list list-style-none ${
                dateSort_visible ? 'visible' : ''
              }`}
            >
              <li>
                <label htmlFor="ascending">
                  <input
                    onChange={handleSelect}
                    id="ascending"
                    name="sort"
                    type="radio"
                    value="Date Ascending"
                  />
                  Date Ascending
                </label>
              </li>
              <li>
                <label htmlFor="descending">
                  <input
                    onChange={handleSelect}
                    id="descending"
                    name="sort"
                    type="radio"
                    value="Date Descending"
                  />
                  Date Descending
                </label>
              </li>
            </ul>
          </div>

          {/* <select
            className="select-input filter-input-element"
            onChange={handleSelect}
          >
            <option disabled>--select option--</option>
            <option
              selected={sortByState === 'DATE_ASC' ? true : false}
              name="sort"
              value="Date ascending"
            >
              Date ascending
            </option>
            <option
              selected={sortByState === 'DATE_DESC' ? true : false}
              name="sort"
              value="Date descending"
            >
              Date descending
            </option>
          </select> */}
        </div>
        <div className="filter-elements filter-priority-element">
          <div className="priority-sort-container filter-input-elements">
            <button
              className="priority-btn filter-btn btn"
              onClick={(e) => {
                e.preventDefault();
                setPrioritySortVisible(!prioritySort_visible);
                setDateSortVisible(false);
                setChecklistVisible(false);
              }}
            >
              <span className="fa-solid fa-star"></span>
            </button>
            <ul
              className={`filter-list priority-sort-list list-style-none ${
                prioritySort_visible ? 'visible' : ''
              }`}
            >
              <li>
                <label htmlFor="priority_low">
                  <input
                    onChange={handlePrioritySelect}
                    id="priority_low"
                    name="priority"
                    type="radio"
                    value="priority_low"
                  />
                  Low
                </label>
              </li>
              <li>
                <label htmlFor="priority_medium">
                  <input
                    onChange={handlePrioritySelect}
                    id="priority_medium"
                    name="priority"
                    type="radio"
                    value="priority_medium"
                  />
                  Medium
                </label>
              </li>
              <li>
                <label htmlFor="priority_high">
                  <input
                    onChange={handlePrioritySelect}
                    id="priority_high"
                    name="priority"
                    type="radio"
                    value="priority_high"
                  />
                  High
                </label>
              </li>
            </ul>
          </div>
          {/* <select
            className="select-input filter-input-element"
            onChange={handlePrioritySelect}
          >
            <option disabled selected={priorityState ? false : true}>
              --select option--
            </option>
            <option
              selected={priorityState === 'PRIORITY_LOW' ? true : false}
              name="priority"
              value="priority_low"
            >
              Low
            </option>
            <option
              selected={priorityState === 'PRIORITY_MEDIUM' ? true : false}
              name="priority"
              value="priority_medium"
            >
              Medium
            </option>
            <option
              selected={priorityState === 'PRIORITY_HIGH' ? true : false}
              name="priority"
              value="priority_high"
            >
              high
            </option>
          </select> */}
        </div>
      </form>
      <button
        onClick={handleClearBtn}
        className="btn btn-link-primary filter-clear-btn"
      >
        Clear Filters
      </button>
    </aside>
  );
};

export { Filter };
