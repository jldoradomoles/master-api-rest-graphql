import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from './api';
import { CharacterComponent } from './character.component';
import { Character } from './api';
import { mapCharacterFromApiToVm } from './character.mappers';

export const CharacterContainer: React.FunctionComponent = (props) => {
  const [character, setCharacter] = React.useState<Character>();
  // const [cities, setCities] = React.useState<Lookup[]>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // const handleLoadCityCollection = async () => {
  //   const apiCities = await api.getCities();
  //   setCities(apiCities);
  // };

  const handleLoadCharacter = async () => {
    const apiCharacter = await api.getCharacter(id);
    setCharacter(mapCharacterFromApiToVm(apiCharacter));
  };

  // handleLoadCharacter();


  React.useEffect(() => {
    if (id) {
      handleLoadCharacter();
    }
  }, []);

  const handleSave = async (character: Character) => {
    const apiCharacter = mapCharacterFromApiToVm(character);
    const success = await api.updateCharacterSentence(apiCharacter);
    if (success) {
      navigate(-1);
    } else {
      alert('Error on save character');
    }
  };



  return character ? (
    <CharacterComponent character={character} onSave={handleSave} />
  ) : (
    <div>Loading...</div>
  );
};
