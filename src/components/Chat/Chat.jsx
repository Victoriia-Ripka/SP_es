import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import { MessageForm } from 'components/MessageForm/MessageForm';
import axios from 'axios';
import { MessagesHistory } from 'components/MessageHistory/MessageHistory';
import { useEffect } from 'react';


export const Chat = ({ userData, message, url, systemComments }) => {
    const [messages, setMessages] = useState([]);
    const [pvData, setPVData] = useState(userData);

    useEffect(() => {
        let assistantAnswer = '';
        systemComments?.forEach(item => {
            const comment = item[0];
            if(typeof comment === "string" && comment.includes('rule ok: ')){
                assistantAnswer += comment.replace('rule ok: ', '');
            } else if(typeof comment === "object" ) {
                assistantAnswer += JSON.stringify(comment);
            } else {
                assistantAnswer += comment;
            }
        });

        if(assistantAnswer){
            setMessages((prevMessages) => [...prevMessages, { message: assistantAnswer, role: "assistant" }]);
        };
        
      }, [systemComments]);


    useEffect(() => {
        setMessages((prevMessages) => [...prevMessages, { message: message, role: "assistant" }]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSend = (message) => {
        setMessages((prevMessages) => [...prevMessages, { message, role: "user" }]);

        const updatedUserData = {
            ...pvData,
            messagesCount: pvData.messagesCount + 1
        };

        axios.post(`${url}/expert-system/ask`, { message, pv_user_data: updatedUserData })
            .then(res => {

                const data = res.data;
                // added new updated user data from backend
                setMessages((prevMessages) => [...prevMessages, { message: data.answer, role: "assistant" }]);
                setPVData(data.updated_user_data);
            }).catch(err => console.error(err));
    };

    return (
        <Container disableGutters sx={{ display: 'flex', flexDirection: 'column', flex: 1, maxWidth: 410, maxHeight: 'calc(100vh - 68px)' }}>
            <Box sx={{ flex: 1, overflowY: 'auto', border: '1px solid #ccc', p: 2 }}>
                <MessagesHistory messages={messages} />
            </Box>

            <MessageForm sx={{ p: 2 }} onSend={onSend} />
        </Container>
    );
};
