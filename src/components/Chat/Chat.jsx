import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import { Form } from 'components/Form/Form';
import axios from 'axios';
import { MessagesHistory } from 'components/MessageHistory/MessageHistory';

const backendUrl = process.env.REACT_APP_BACKEND_API;

let pv_user_data = {
    pv_type: "",
    power: 0,
    pv_square: 0,
    messages_count: 1
}

export const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [data, setData] = useState(pv_user_data);

    const onSend = async (message) => {
        setMessages((prevMessages) => [...prevMessages, { message, role: "user" }]);
        
        try {
            const response = await axios.post(`${backendUrl}/assistant/ask`, { message, data });
            console.log('Response:', response);
            setMessages((prevMessages) => [...prevMessages, { message: response.data.answer, role: "assistant" }]);
            setData(response.updated_user_data);
        } catch (error) {
            console.error('Error:', error);
        }

        console.log(data);
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
