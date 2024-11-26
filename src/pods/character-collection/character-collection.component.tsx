import * as React from 'react';
import Button from '@mui/material/Button';
import { CharacterEntityVm } from './character-collection.vm';
import { CharacterCard } from './components/character-card.component';
import * as classes from './character-collection.styles';

interface Props {
  characterCollection: CharacterEntityVm[];
  onEdit: (id: string) => void;
}

export const CharecterCollectionComponent: React.FunctionComponent<Props> = (
  props
) => {
  const { characterCollection, onEdit } = props;
 
  return (
    <div className={classes.root}>
      <ul className={classes.list}>
        {characterCollection.map((character) => (
          <li key={character.id}>
            <CharacterCard character={character} onEdit={onEdit}  />
          </li>
        ))}
      </ul>
    </div>
  );
};
