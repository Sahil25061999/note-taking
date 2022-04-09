import axios from 'axios';

export const deleteArchive = async (id, token) => {
  try {
    const response = await axios.delete(`/api/archives/delete/${id}`, {
      headers: {
        authorization: token,
      },
    });
    return response;
  } catch (e) {
    console.error(e);
    return e.response;
  }
};
