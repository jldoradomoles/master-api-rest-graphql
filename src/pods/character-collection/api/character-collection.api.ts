import { CharacterEntityApi } from './character-collection.api-model';
import axios from 'axios';

const url = 'http://localhost:3000';

export const getCharacterCollection = async (
  page: number,
  pageSize: number
): Promise<CharacterEntityApi[]> => {
  const response = await axios.get(`${url}/characters`);
  if (!response) {
    throw new Error('Failed to fetch characters');
  }
  const paginatedData = response.data.slice(page, pageSize);
  return paginatedData;
};

export const searchCharacterByName = async (
  name: string
): Promise<CharacterEntityApi[]> => {
  const response = await axios.get(`${url}/characters`, {
    params: {
      name_like: name,
    },
  });
  if (!response) {
    throw new Error('Failed to fetch character');
  }
  return response.data;
};
