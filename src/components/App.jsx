import * as React from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import { Chat } from './Chat/Chat';
import { FormsContainer } from './FormsContainer/FormsContainer';

const pvStartedData = {
    intent: "", // актуальний намір користувача
    pv_power: 0,
    pv_instalation_place: "",
    pv_area: 0,
    is_electric_autonomy_important: "",
    is_possible_electricity_grid_connection: "",
    is_exist_money_limit: "",
    
    cache: {
        history: [],
        pv_type: "",
        original_intent: '' // оригінальний намір експертної системи
    },
    messagesCount: 0
}

export const App = () => {
  return (
    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', height: '100vh', gap: 2 }}>
      <Box component="section" sx={{ p: 1, border: '1px dashed grey' }}>
        <p>Експертна система для проєктування СЕС</p>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 10 }}>
        <FormsContainer userData={pvStartedData}/>

        <Chat userData={pvStartedData}/>

      </Box>

    </Container>
  );
};
