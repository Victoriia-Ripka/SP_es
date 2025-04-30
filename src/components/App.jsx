import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Container, Typography } from '@mui/material';
import { Chat } from './Chat/Chat';
import axios from 'axios';
import { FormsContainer } from './FormsContainer/FormsContainer';

// const backendUrl = 'https://sp-es-backend.onrender.com'
const backendUrl = process.env.REACT_APP_BACKEND_API;

export const App = () => {
  const [pvUserData, setpvUserData] = useState(null);
  const [pvTypeData, setPvTypeData] = useState(null);
  const [pvDesignData, setPvDesignData] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    axios.get(`${backendUrl}/expert-system/start`)
      .then((res) => {
        const data = res.data;
        setMessage(data.answer);
        setpvUserData(data.pv_user_data);

        setPvDesignData(data.pv_user_data['data_designing_pv']);
        setPvTypeData(data.pv_user_data['data_determining_pv_type'])
      })
      .catch((err) => console.log(err));
  }, [])


  return (
    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', height: '100vh', gap: 2 }}>
      <Box component="section" sx={{ p: 1, border: '1px dashed grey' }}>
        <p>Експертна система для проєктування СЕС</p>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 10 }}>

        {pvUserData ? (
          <>
            <FormsContainer pvTypeData={pvTypeData} pvDesignData={pvDesignData}  url={backendUrl}/>
            <Chat userData={pvUserData} message={message} url={backendUrl} />
          </>
        ) : (
          <Typography>Почекай хвилинку...</Typography>
        )}

      </Box>

    </Container>
  );
};
