import axios from 'axios';

export const getArchive = async (token) => {
  try {
    const response = await axios.get('/api/archives', { headers: token });
    if (response.status === 200 || response.status === 201) {
      return response.data.archives;
    }
  } catch (e) {
    console.error(e);
  }
};
