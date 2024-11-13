import { CharacterEntityApi } from 'pods/character-collection/api';
import { Character } from './character.api-model';
import axios from 'axios';

const url = 'http://localhost:3000';

export const getCharacter = async (id: string): Promise<Character> => {
  const response = await axios.get(`${url}/character/${id}`);
  return response.data;
};

export const updateCharacterSentence = async (
  character: Character
): Promise<CharacterEntityApi> => {
  const response = await axios.patch(`${url}/character/${character.id}`, {
    sentences: character.sentences,
  });
  return response.data;
};
