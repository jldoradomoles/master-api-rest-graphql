import React from 'react';
import { useParams } from 'react-router-dom';
import { CharacterComponent } from './character.component';
import { useQuery, gql } from '@apollo/client';

const GET_CHARACTER_BY_ID = gql`
  query GetCharacterById($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      origin {
        name
      }
      location {
        name
      }
    }
  }
`;

export const CharacterContainer: React.FunctionComponent = (props) => {
  // const [cities, setCities] = React.useState<Lookup[]>([]);
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_CHARACTER_BY_ID, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const character = data.character;

  return character ? (
    <CharacterComponent character={character} />
  ) : (
    <div>Loading...</div>
  );
};
