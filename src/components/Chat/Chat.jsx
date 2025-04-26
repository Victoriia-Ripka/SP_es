import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import { Form } from 'components/Form/Form';
import axios from 'axios';
import { MessagesHistory } from 'components/MessageHistory/MessageHistory';
import { useEffect } from 'react';

const backendUrl = process.env.REACT_APP_BACKEND_API;

const pvStartedData = {
    intent: "",
    power: 0,
    pvType: "",
    pvSquare: 0,
    pvInstalationPlace: "",

    cache: {},
    messagesCount: 0
}

export const Chat = () => {
    const [messages, setMessages] = useState([])
    const [pvData, setPVData] = useState(pvStartedData)
    // const [messages, setMessages] = useState(() => {
    //     const savedMessages = localStorage.getItem("messages");
    //     return savedMessages ? JSON.parse(savedMessages) : [];
    // });
    // const [pvData, setPVData] = useState(() => {
    //     const savedPvData = localStorage.getItem("pvData");
    //     return savedPvData ? JSON.parse(savedPvData) : pvStartedData;
    // });

    // useEffect(() => {
    //     localStorage.setItem("pvData", JSON.stringify(pvData));
    // }, [pvData]);

    // useEffect(() => {
    //     localStorage.setItem("messages", JSON.stringify(messages));
    // }, [messages]);

    useEffect(() => {
        // if (Object.keys(messages).length === 0) {
            axios.post(`${backendUrl}/assistant/start`, { pv_user_data: pvData })
                .then((res) => {
                    const data = res.data;
                    setMessages((prevMessages) => [...prevMessages, { message: data.answer, role: "assistant" }]);
                    setPVData(data.updated_user_data);
                })
                .catch((err) => console.log(err));
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSend = (message) => {
        setMessages((prevMessages) => [...prevMessages, { message, role: "user" }]);

        const updatedUserData = {
            ...pvData,
            messagesCount: pvData.messagesCount + 1
        };

        axios.post(`${backendUrl}/assistant/ask`, { message, pv_user_data: updatedUserData })
            .then(res => {

                const data = res.data;
                // added new updated user data from backend
                setMessages((prevMessages) => [...prevMessages, { message: data.answer, role: "assistant" }]);
                setPVData(data.updated_user_data);
            }).catch(err => console.error(err)).finally(
                console.log(pvData)
            )
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
