import axios from 'axios';

export const postNote = async (editId, note, token) => {
  try {
    const response = await axios.post(
      `/api/notes${editId ? `/${editId}` : ''}`,
      { note: { ...note, createdAt: new Date() } },
      { headers: { authorization: token } }
    );
    return response;
  } catch (e) {
    console.error(e);
    return e.response;
  }
};
