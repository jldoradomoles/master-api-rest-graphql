import * as React from 'react';
import { CharacterEntityVm } from './character-collection.vm';
import { getCharacterCollection, searchCharacterByName } from './api';
import { mapFromApiToVm } from './character-collection.mapper';
import { mapToCollection } from 'common/mappers';

export const useCharacterCollection = () => {
  const [characterCollection, setCharacterCollection] = React.useState<
    CharacterEntityVm[]
  >([]);

  const loadCharacterCollection = (page, pageSize) => {
    getCharacterCollection(page, pageSize).then((result) =>
      setCharacterCollection(mapToCollection(result, mapFromApiToVm))
    );
  };

  const searchCharacterByNameCollection = (name: string) => {
    searchCharacterByName(name).then((result) =>
      setCharacterCollection(mapToCollection(result, mapFromApiToVm))
    );
  };

  return { characterCollection, loadCharacterCollection };
};
