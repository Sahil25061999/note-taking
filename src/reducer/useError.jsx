import React, { useReducer } from 'react';

const errorReducerFunc = (state, action) => {
  switch (action.type) {
    case 'EMAIL_ERROR':
      return { ...state, emailError: action.payload };
    case 'PASSWORD_ERROR':
      return { ...state, passwordError: action.payload };
    case 'CONFIRM_PASSWORD_ERROR':
      return { ...state, confirmPasswordError: action.payload };
    case 'NOTE_TITLE_ERROR':
      return { ...state, noteTitleError: action.payload };
    case 'NOTE_DESCRIPTION_ERROR':
      return { ...state, noteDescriptionError: action.payload };
    default:
      return { ...state };
  }
};

export const useError = () => {
  const [error, errorDispatch] = useReducer(errorReducerFunc, {
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
    noteTitleError: '',
    noteDescriptionError: '',
  });
  return [error, errorDispatch];
};
