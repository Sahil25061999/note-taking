import React from 'react';
import './FilterModal.css';
import { useFilter } from '../../context/context-index';

export const FilterModal = () => {
  const {
    sortByState,
    priorityState,
    tagState,
    filterDispatch,
    displayFilterModal,
  } = useFilter();
  const { work, exercise, homework, creative } = tagState;

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

  return (
    <div
      className={`modal-container notes-modal-container ${
        displayFilterModal ? 'visible' : ''
      }`}
    >
      <div
        className={`modal shadow notes-modal ${
          displayFilterModal ? 'visible' : ''
        }`}
      >
        <div className="filter-form-head d-flex">
          <h1 className="modal-title">Filters</h1>
          <button
            onClick={() => {
              filterDispatch({ type: 'DISPLAY_FILTER_MODAL' });
            }}
            className="btn btn-float close-btn"
          >
            <span className="fa-solid fa-xmark"></span>
          </button>
        </div>

        <form className="modal-form" onClick={(e) => e.stopPropagation()}>
          <div className="form-content priority-section">
            <h3 className=" modal-title modal-title-date">
              <strong>Date</strong>
            </h3>
            <ul className="priority-input-list list-style-none d-flex">
              <li
                className={`date-option ${
                  sortByState === 'DATE_DESC' ? 'active' : ''
                }`}
              >
                <label htmlFor="date-descending">
                  <input
                    onClick={() =>
                      filterDispatch({
                        type: 'DATE_DESC',
                        payload: 'DATE_DESC',
                      })
                    }
                    type="radio"
                    name="date"
                    id="date-descending"
                    value="DATE_DESCENDING"
                  />
                  Recently Added
                </label>
              </li>
              <li
                className={`date-option ${
                  sortByState === 'DATE_ASC' ? 'active' : ''
                }`}
              >
                <label htmlFor="date-ascending">
                  <input
                    onClick={() =>
                      filterDispatch({
                        type: 'DATE_ASC',
                        payload: 'DATE_ASC',
                      })
                    }
                    type="radio"
                    name="date"
                    id="date-ascending"
                    value="DATE_ASCENDING"
                  />
                  Oldest
                </label>
              </li>
            </ul>
          </div>

          {/*                   PRIORITY SECTION              */}
          <div className="form-content priority-section">
            <h3 className=" modal-title modal-title-priority">
              <strong>Priority</strong>
            </h3>
            <ul className="priority-input-list list-style-none d-flex">
              <li
                className={`priority-option ${
                  priorityState === 'PRIORITY_LOW' ? 'active' : ''
                }`}
              >
                <label htmlFor="priority-low">
                  <input
                    onClick={() =>
                      priorityState === 'PRIORITY_LOW'
                        ? filterDispatch({
                            type: 'PRIORITY_LOW_FILTER',
                            payload: '',
                          })
                        : filterDispatch({
                            type: 'PRIORITY_LOW_FILTER',
                            payload: 'PRIORITY_LOW',
                          })
                    }
                    type="radio"
                    name="priortiy"
                    id="priority-low"
                    value="PRIORITY_LOW"
                  />
                  Low
                </label>
              </li>
              <li
                className={`priority-option ${
                  priorityState === 'PRIORITY_MEDIUM' ? 'active' : ''
                }`}
              >
                <label htmlFor="priority-medium">
                  <input
                    onClick={() =>
                      priorityState === 'PRIORITY_MEDIUM'
                        ? filterDispatch({
                            type: 'PRIORITY_MEDIUM_FILTER',
                            payload: '',
                          })
                        : filterDispatch({
                            type: 'PRIORITY_MEDIUM_FILTER',
                            payload: 'PRIORITY_MEDIUM',
                          })
                    }
                    type="radio"
                    name="priortiy"
                    id="priority-medium"
                    value="PRIORITY_MEDIUM"
                  />
                  Medium
                </label>
              </li>
              <li
                className={`priority-option ${
                  priorityState === 'PRIORITY_HIGH' ? 'active' : ''
                }`}
              >
                <label htmlFor="priority-high">
                  <input
                    onClick={() =>
                      priorityState === 'PRIORITY_HIGH'
                        ? filterDispatch({
                            type: 'PRIORITY_HIGH_FILTER',
                            payload: '',
                          })
                        : filterDispatch({
                            type: 'PRIORITY_HIGH_FILTER',
                            payload: 'PRIORITY_HIGH',
                          })
                    }
                    type="radio"
                    name="priortiy"
                    id="priority-high"
                    value="PRIORITY_HIGH"
                  />
                  High
                </label>
              </li>
            </ul>
          </div>
          {/* </div> */}

          {/*                   Tags                           */}
          <div className="form-content tags-section">
            <h3 className=" modal-title">Tags</h3>
            <ul className="checkbox-container list-style-none d-flex">
              <li className={`tag-inputs ${work ? 'active' : ''}`}>
                <label htmlFor="work">
                  <input
                    name="work"
                    className="checkbox "
                    id="work"
                    type="checkbox"
                    checked={work}
                    onChange={() => {
                      filterDispatch({ type: 'WORK_FILTER' });
                    }}
                    value="work"
                  />
                  Work
                </label>
              </li>
              <li className={`tag-inputs ${homework ? 'active' : ''}`}>
                <label htmlFor="homework">
                  <input
                    className="checkbox "
                    id="homework"
                    name="homework"
                    type="checkbox"
                    checked={homework}
                    onChange={() => {
                      filterDispatch({ type: 'HOMEWORK_FILTER' });
                    }}
                    value="homework"
                  />
                  Homework
                </label>
              </li>
              <li className={`tag-inputs ${exercise ? 'active' : ''}`}>
                <label htmlFor="exercise">
                  <input
                    className="checkbox "
                    id="exercise"
                    name="exercise"
                    type="checkbox"
                    checked={exercise}
                    onChange={() => {
                      filterDispatch({ type: 'EXERCISE_FILTER' });
                    }}
                    value="exercise"
                  />
                  Exercise
                </label>
              </li>
              <li className={`tag-inputs ${creative ? 'active' : ''}`}>
                <label htmlFor="creative">
                  <input
                    className="checkbox"
                    id="creative"
                    name="creative"
                    type="checkbox"
                    checked={creative}
                    onChange={() => {
                      filterDispatch({ type: 'CREATIVE_FILTER' });
                    }}
                    value="creative"
                  />
                  Creative
                </label>
              </li>
            </ul>
          </div>

          {/*                   Button BOX                           */}
          <div className="form-bottom d-flex notes-modal-bottom-container filter-modal-bottom-container">
            <button className="btn  clear-btn" onClick={handleClearBtn}>
              Clear All
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
