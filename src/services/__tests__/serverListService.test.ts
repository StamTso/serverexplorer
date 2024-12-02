import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { fetchServerList } from '../serverListService';
import mockServers from '../../tests/data/mockServers';

const mockedAxios = axios as typeof axios;
const SERVERS_ENDPOINT = 'https://playground.tesonet.lt/v1/servers';
const mockToken = 'mockToken';
const mockError = new Error('Network error');

vi.mock('axios');

describe('serverListService', () => {
  it('should return the server list on successful fetch', async () => {
    mockedAxios.get = vi.fn().mockResolvedValueOnce({ data: mockServers });

    const result = await fetchServerList(mockToken);

    expect(result).toEqual(mockServers);
    expect(mockedAxios.get).toHaveBeenCalled();
    expect(mockedAxios.get).toHaveBeenCalledWith(SERVERS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${mockToken}`,
      },
    });
  });

  it('should throw an error on failed fetch', async () => {
    mockedAxios.get = vi.fn().mockRejectedValueOnce(mockError);

    await expect(fetchServerList(mockToken)).rejects.toThrow(
      'Failed to fetch the server list.'
    );
    expect(mockedAxios.get).toHaveBeenCalled();
    expect(mockedAxios.get).toHaveBeenCalledWith(SERVERS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${mockToken}`,
      },
    });
  });
});
