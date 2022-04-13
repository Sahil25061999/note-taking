import axios from 'axios';

export const postArchiveRestore = async (id, item, token) => {
  try {
    const response = await axios.post(
      `/api/archives/restore/${id}`,
      { archives: item },
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
