import { gql } from 'apollo-server-express';
export const typeDefs = gql`
  type Character {
    id: ID!
    name: String
    status: String
    species: String
    type: String
    gender: String
    origin: Origin
    location: Origin
    image: String
    episode: String
    url: String
    created: String
    sentences: String
  }

  type Info {
    count: Int
    pages: Int
    next: Int
    prev: Int
  }

  type Characters {
    info: Info
    results: [Character]
  }

  input FilterCharacter {
    name: String
  }

  type Query {
    characters(page: Int, filter: FilterCharacter): Characters
    character(id: ID!): Character
  }

  type Origin {
    name: String
    url: String
  }
`;
