import { useState } from 'react';
import { useFilter } from '../../context/context-index';
import './Filter.css';
const Filter = () => {
  const { sortByState, tagState, filterDispatch } = useFilter();

  const { work, exercise, homework, creative } = tagState;
  const [visible, setVisi] = useState(false);

  const handleClearBtn = (e) => {
    e.preventDefault();
    filterDispatch({
      type: 'CLEAR',
      payload: {
        sortByState: null,
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
    setVisi(!visible);
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

  return (
    <aside className="filter-section">
      <form className="filter-container" action="">
        <div className="filter-elements filter-category-element">
          <p>Tags</p>
          <div className="checklist-container filter-input-element">
            <span
              className={`checklist-title ${visible ? 'visible' : ''}`}
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
            <option
              onChange={() =>
                filterDispatch({
                  type: 'DATE_ASC',
                  payload: 'DATE_ASC',
                })
              }
              selected={sortByState === 'DATE_ASC' ? true : false}
              // checked={sortByState === 'DATE_ASC' ? true : false}
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
              // checked={sortByState === 'DATE_DESC' ? true : false}
              name="sort"
              value="Date descending"
            >
              Date descending
            </option>
          </select>
          {/* <label className="margin-b-5">
              <input
                onChange={() =>
                  filterDispatch({
                    type: 'DATE_ASC',
                    payload: 'DATE_ASC',
                  })
                }
                checked={sortByState === 'DATE_ASC' ? true : false}
                type="radio"
                name="sort"
                value="Date ascending"
              />
              Date ascending
            </label>
            <label className="margin-b-5">
              <input
                onChange={() =>
                  filterDispatch({
                    type: 'DATE_DESC',
                    payload: 'DATE_DESC',
                  })
                }
                checked={sortByState === 'DATE_DESC' ? true : false}
                type="radio"
                name="sort"
                value="Date descending"
              />
              Date descending
            </label> */}
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
