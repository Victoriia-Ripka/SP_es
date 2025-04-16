import React from 'react';
import { Message } from 'components/Message/Message';
import { Box } from '@mui/material';

export const MessagesHistory = ({ messages }) => {
    if (!messages || messages.length === 0) {
        return <p>No messages yet.</p>;
    }

    return (
        <Box display="flex" flexDirection="column" gap={1}>
            {messages.map((message, index) => (
                <Message key={index} message={message}></Message>
            ))}
        </Box>
    );
};
