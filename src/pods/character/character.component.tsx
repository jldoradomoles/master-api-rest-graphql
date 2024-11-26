import React from 'react';
import * as classes from './character.styles';
import { Character } from './api';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface Props {
  character: Character;
}

export const CharacterComponent: React.FunctionComponent<Props> = (props) => {
  const { character } = props;
  console.log(character);

  if (!character) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <Card>
      <CardHeader
        title={character.name}
      />
      <CardContent>
        <div className={classes.root}>
          <CardMedia
            image={character.image}
            title={character.name}
            style={{ height: 0, paddingTop: '56.25%' }}
          />
          <Typography variant="subtitle1" gutterBottom>
            Especie: {character.species} 
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
             Estado:  {character.status}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
             Tipo:  {character.type}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
             Genero:  {character.gender}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
             Origen:  {character.origin.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
             Localización: {character.location.name}
          </Typography> 
          
        </div>
      </CardContent>
    </Card>
    </div>
  );
};
