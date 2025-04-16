import * as React from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import { Chat } from './Chat/Chat';

export const App = () => {
  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', height: '100vh', gap: 2 }}>
      <Box component="section" sx={{ p: 1, border: '1px dashed grey' }}>
        <p>Експертна система для проєктування СЕС</p>
      </Box>

      <Chat sx={{ flex: 1 }} />
    </Container>
  );
};
