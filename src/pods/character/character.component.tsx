import React from 'react';
import { Formik, Form } from 'formik';
import Button from '@mui/material/Button';
import {
  TextFieldComponent,
  RatingComponent,
} from 'common/components';
import { Lookup } from 'common/models';
import { formValidation } from './character.validations';
import * as classes from './character.styles';
import { Character } from './api';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar/Avatar';
import IconButton from '@mui/material/IconButton/IconButton';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  character: Character;
  onSave: (character: Character) => void;
}

export const CharacterComponent: React.FunctionComponent<Props> = (props) => {
  const { character, onSave } = props;
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
             Localización:  {character.location.name}
          </Typography> 
          <Typography variant="subtitle1" gutterBottom>
            Cantidad de episodios: {character.episode.length}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Frases:
          </Typography>
          <ul>
            {character.sentences.map((sentence, index) => (
              <li key={index}>
                <Typography variant="body1" gutterBottom>
                  {sentence}
                </Typography>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>

    <Formik
      initialValues={{ sentence: '' }}
      onSubmit={(values, { resetForm }) => {
        const updatedCharacter = {
      ...character,
      sentences: [...(character.sentences || []), values.sentence],
        };
        onSave(updatedCharacter);
        resetForm();
      }}
    >
      {({ values, handleChange }) => (
        <Form className={classes.root}>
      <TextFieldComponent
        className='container-form'
        name="sentence"
        label="Nueva frase"
        value={values.sentence}
        onChange={handleChange}
      />
      <Button className='button' type="submit" variant="contained" color="primary">
        Añadir frase
      </Button>
        </Form>
      )}
    </Formik>

    </div>
  );
};
