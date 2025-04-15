import * as React from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import { Chat } from "./Chat/Chat";

export const App = () => {

  return (
    <Container maxWidth="sm">
      <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}> 
        <p>Якийсь заголовок тут</p>
      </Box>

      <Chat />
    </Container>
  );
};
