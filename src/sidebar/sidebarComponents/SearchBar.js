import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { sidebarContext } from '../../context/SidebarContext';

const SearchBar = ({ id }) => {
  const SidebarContext = React.useContext(sidebarContext);
  const { getImages, getGifs, getStickers } = SidebarContext;

  const handleChange = (value) => { 
    if (id === 'image') { 
      getImages(value);
    } else if (id === 'gif') { 
      getGifs(value); 
    } else if (id === 'stickers') { 
      getStickers(value);
    }
  }

  return (
    <Paper 
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', mb: '20px' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => handleChange(e.target.value)}
      />
      <IconButton onClick={handleChange} type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;