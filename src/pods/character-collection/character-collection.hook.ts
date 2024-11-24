import * as React from 'react';
import { CharacterEntityVm } from './character-collection.vm';
import { getCharacterCollection, searchCharacterByName } from './api';
import { mapFromApiToVm } from './character-collection.mapper';
import { mapToCollection } from 'common/mappers';
import { useQuery, gql, ApolloProvider } from '@apollo/client';

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $name: String) {
    characters(page: $page, name: $name) {
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
`;

export const useCharacterCollection = () => {
  const [characterCollection, setCharacterCollection] = React.useState<
    CharacterEntityVm[]
  >([]);

  const loadCharacterCollection = (page, pageSize) => {
    const { data } = useQuery(GET_CHARACTERS, {
      variables: { page, pageSize },
    });
    console.log(data);

    setCharacterCollection(mapToCollection(data, mapFromApiToVm));

    // getCharacterCollection(page, pageSize).then((result) =>
    //   setCharacterCollection(mapToCollection(result, mapFromApiToVm))
    // );
  };

  const searchCharacterByNameCollection = (name: string) => {
    searchCharacterByName(name).then((result) =>
      setCharacterCollection(mapToCollection(result, mapFromApiToVm))
    );
  };

  return { characterCollection, loadCharacterCollection };
};
