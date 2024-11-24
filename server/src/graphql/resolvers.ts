import axios from 'axios';
import { getCharacterCollection } from '../api/character-collection.api';
import { Character } from 'db/models/character.model';

const RICK_AND_MORTY_API_URL = 'https://rickandmortyapi.com/graphql';

export const resolvers = {
  Query: {
    characters: async (
      _: any,
      { page, filter }: { page: number; filter?: { name?: string } }
    ) => {
      const response = await axios.post(RICK_AND_MORTY_API_URL, {
        query: `
          query ($page: Int, $filter: FilterCharacter) {
            characters(page: $page, filter: $filter) {
              info {
                count
                pages
                next
                prev
              }
              results {
                id
                name
                status
                species
                type
                gender
                image
              }
            }
          }
        `,
        variables: { page, filter },
      });

      return response.data.data.characters;
    },
  },
};
