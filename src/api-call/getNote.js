import axios from 'axios';

export const getNote = async (token) => {
  try {
    const response = await axios.get('/api/notes', {
      headers: { authorization: token },
    });
    return response;
  } catch (e) {
    console.error(e);
    return e.response;
  }
};
