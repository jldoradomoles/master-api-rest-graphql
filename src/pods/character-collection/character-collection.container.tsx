import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { linkRoutes } from 'core/router';
import { CharecterCollectionComponent } from './character-collection.component';
import { Button, TextField } from '@mui/material';
import './character-collection.container.css';
import { useQuery, gql } from '@apollo/client';

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
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

export const CharacterCollectionContainer = ({ page: initialPage, name: initialName = '' }:
   { page: number; name?: string }) => {
  const [page, setPage] = React.useState(initialPage);
  const [name, setName] = React.useState(initialName);
  const [searchTerm, setSearchTerm] = React.useState(initialName);
  const { loading, error, data, refetch } = useQuery(GET_CHARACTERS, {
    variables: { page, name: name || ''},
  });

  const [filteredCharacterCollection, setFilteredCharacterCollection] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    if(data) {
      console.log('entra');
      setFilteredCharacterCollection(data.characters.results);
    }
  }, [data]);

 
  const handleEdit = (id: string) => {
    navigate(linkRoutes.editCharacter(id));
  };

  const handlePageChange = (direction: 'next' | 'prev') => {
    const newPage = direction === 'next' ? page + 1 : page - 1;
    setPage(newPage);
    refetch({ page: newPage, name: name || '' });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  }

  const handleSearch = () => {
    if (searchTerm.length >= 4) {
      setName(searchTerm);
      refetch({ page, name: searchTerm });
    } else {
      setFilteredCharacterCollection([]);
    }
  };

  const handleRefresh = () => {
    setSearchTerm('');
    setName('');
    refetch({ page, name: name || '' });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  return (
    <div>
        {filteredCharacterCollection.length > 0 ? (
          <CharecterCollectionComponent
            characterCollection={filteredCharacterCollection}
            onEdit={handleEdit}
          />
        ) : (
           <div>Sin resultados</div>
        )}
      <div className='btn-container'>
        <Button className='btn-prev' variant="contained" color="primary" onClick={() => handlePageChange('prev')}>
          Anterior
        </Button>
        <Button className='btn-next' variant="contained" color="primary" onClick={() => handlePageChange('next')}>
          Siguiente
        </Button>
        <Button className='btn-refresh' variant="contained" color="primary" onClick={handleRefresh}>
          Refrescar
        </Button>
      </div>
      <div className='search-input'>
        <TextField
          className=''
          type="text"
          placeholder="Busca por nombre"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button className='btn-search' variant="contained" color="primary" onClick={handleSearch}>
            Buscar
          </Button>
      </div>
    </div>
    
  );
};
