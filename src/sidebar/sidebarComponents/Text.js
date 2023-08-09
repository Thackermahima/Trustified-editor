import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { Box, Typography } from '@mui/material';
import WebFont from 'webfontloader';
import SearchBar from './SearchBar';

const fontList = ['Roboto',
  'Borsok', 'Open Sans',
  'Lato ', 'Poppins', 'Zeyada',
  'Babylonica', 'Dancing Script',
  'Lobster', 'Pacifico', 'Caveat',
  'Satisfy', 'Great Vibes', 'Ole', 'Coiny', 'Kenia', 'Rubik Beastly', 'Londrina Sketch', 'Neonderthaw',
  'Kumar One', 'Ribeye', 'Emblema One', 'Ewert', 'Kavoon', 'Moul', 'Rubik Moonrocks', 'Rubik Iso',
  'Unifraktur Cook', 'Germania One', 'Monoton', 'Orbitron', 'Rampart One', 'Black Ops One',
  'Aldrich', 'Schoolbell', 'UnifrakturMaguntia', 'Montez', 'DotGothic16', 'Lexend Zetta', 'UnifrakturCook',
  'Iceland',
];

const Text = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: fontList,
      },
    });
  }, []);
  return (
    <div>
      <SearchBar id="fonts" />
      <Button variant="contained" fullWidth>Add text</Button>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} >
        <Typography display="inline-block" fontSize={15} sx={{ marginLeft: '7px' }}>Fonts</Typography>
      </Box>

      <div className='container'>
        <div className='row' style={{ overflow: "scroll", height: "100vh" }}>
          {fontList && fontList.map((font, index) => {
            return (
              <div className='col-6' style={{ marginBottom: index + 1 === fontList.length ? '180pt' : '10px', padding: '10px' }}>
                <p style={{
                  fontFamily: font,
                  cursor: 'pointer',
                  height: 'auto',
                  width: '100%',
                  overflow: 'hidden',
                  margin:0,
                  textAlign:'center'
                }}>{font}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>

  );
};

export default Text;