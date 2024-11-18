import { getCharacterCollection } from '../api/character-collection.api';
import { Character } from 'db/models/character.model';

const url = 'http://localhost:3000';

export const resolvers = {
  Query: {
    characters: async (
      page: number,
      pageSize: number
    ): Promise<Character[]> => {
      const response = await getCharacterCollection(page, pageSize);
      return response.map((character) => ({
        id: character.id,
        name: character.name,
        status: character.status,
        species: character.species,
        type: character.type,
        gender: character.gender,
        origin: character.origin,
        location: character.location,
        image: character.image,
        episode: character.episode,
        url: character.url,
        created: character.created,
        sentences: character.sentences,
      }));
    },
  },
};
