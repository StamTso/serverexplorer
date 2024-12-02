import axios from 'axios';

const SERVER_LIST_ENDPOINT = 'https://playground.tesonet.lt/v1/servers';

export const fetchServerList = async (token: string) => {
  try {
    const response = await axios.get(SERVER_LIST_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching server list:', error);
    throw new Error('Failed to fetch the server list.');
  }
};
