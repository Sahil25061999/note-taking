import axios from 'axios';

export const postArchive = async (id, item, token) => {
  try {
    const response = await axios.post(
      `/api/notes/archives/${id}`,
      { note: item },
      {
        headers: { authorization: token },
      }
    );
    return response;
  } catch (e) {
    console.error(e);
    return e.response;
  }
};
