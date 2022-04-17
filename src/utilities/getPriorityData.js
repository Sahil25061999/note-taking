import React from 'react';

export const getPriorityData = (data, priorityState) => {
  return priorityState
    ? data.filter(({ priority }) => priority === priorityState)
    : data;
};
