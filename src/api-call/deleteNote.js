import axios from 'axios';

export const deleteNote = async (id, token) => {
  try {
    const response = await axios.delete(`/api/notes/${id}`, {
      headers: { authorization: token },
    });
    return response;
  } catch (e) {
    console.error(e);
    return e.response;
  }
};
