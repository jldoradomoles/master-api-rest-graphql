import { gql } from 'apollo-server-express';
export const typeDefs = gql`
  type Character {
    id: string;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin;
    location: Origin;
    image: string;
    episode: string[];
    url: string;
    created: string;
    sentences: string[];
  }

  type Origin {
    name: string;
    url: string;
  }
  type Query {
    characters: [Character!]!
  }
`;
