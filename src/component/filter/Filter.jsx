import { useState } from 'react';
import { useFilter } from '../../context/context-index';
import './Filter.css';
const Filter = () => {
  const { sortByState, priorityState, tagState, filterDispatch } = useFilter();

  const { work, exercise, homework, creative } = tagState;
  const [checklist_visible, setVisible] = useState(false);

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

  const handleChecklist = () => {
    setVisible(!checklist_visible);
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
          <p>Tags</p>
          <div className="checklist-container filter-input-element">
            <span
              className={`checklist-title ${
                checklist_visible ? 'visible' : ''
              }`}
              onClick={handleChecklist}
            >
              Tags
            </span>
            <ul className="checkbox-list list-style-none">
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
          <p>Sort by</p>

          <select
            className="select-input filter-input-element"
            onChange={handleSelect}
          >
            <option disabled selected={sortByState ? false : true} value>
              --select option--
            </option>
            <option
              onChange={() =>
                filterDispatch({
                  type: 'DATE_ASC',
                  payload: 'DATE_ASC',
                })
              }
              selected={sortByState === 'DATE_ASC' ? true : false}
              name="sort"
              value="Date ascending"
            >
              Date ascending
            </option>
            <option
              onChange={() =>
                filterDispatch({
                  type: 'DATE_DESC',
                  payload: 'DATE_DESC',
                })
              }
              selected={sortByState === 'DATE_DESC' ? true : false}
              name="sort"
              value="Date descending"
            >
              Date descending
            </option>
          </select>
        </div>
        <div className="filter-elements filter-priority-element">
          <p>Priority</p>

          <select
            className="select-input filter-input-element"
            onChange={handlePrioritySelect}
          >
            <option disabled selected={priorityState ? false : true} value>
              --select option--
            </option>
            <option
              onChange={() =>
                filterDispatch({
                  type: 'PRIORITY_LOW_FILTER',
                })
              }
              selected={priorityState === 'PRIORITY_LOW' ? true : false}
              name="priority"
              value="priority_low"
            >
              Low
            </option>
            <option
              onChange={() =>
                filterDispatch({
                  type: 'PRIORITY_MEDIUM_FILTER',
                })
              }
              selected={priorityState === 'PRIORITY_MEDIUM' ? true : false}
              name="priority"
              value="priority_medium"
            >
              Medium
            </option>
            <option
              onChange={() =>
                filterDispatch({
                  type: 'PRIORITY_HIGH_FILTER',
                })
              }
              selected={priorityState === 'PRIORITY_HIGH' ? true : false}
              name="priority"
              value="priority_high"
            >
              high
            </option>
          </select>
        </div>

        <button
          onClick={handleClearBtn}
          className="btn btn-link-primary filter-clear-btn"
        >
          Clear Filters
        </button>
      </form>
    </aside>
  );
};

export { Filter };
