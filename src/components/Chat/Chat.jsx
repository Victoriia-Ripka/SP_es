import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import { Form } from 'components/Form/Form';
import axios from 'axios';
import { MessagesHistory } from 'components/MessageHistory/MessageHistory';

const backendUrl = process.env.REACT_APP_BACKEND_API;

export const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [, setData] = useState([]);

    const onSend = async (message) => {
        try {
            const response = await axios.post(`${backendUrl}/assistant/ask`, { message });
            console.log('Response:', response);
            setMessages((prevMessages) => [...prevMessages, { message, role: "user" }]);
            setMessages((prevMessages) => [...prevMessages, { message: response.data.answer, role: "assistant" }]);
            setData((prevData) => [...prevData, response])
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container disableGutters sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <Box sx={{ flex: 1, overflowY: 'auto', border: '1px solid #ccc', p: 2 }}>
                <MessagesHistory messages={messages} />
            </Box>

            <Form sx={{ p: 2 }} onSend={onSend} />
        </Container>
    );
};
