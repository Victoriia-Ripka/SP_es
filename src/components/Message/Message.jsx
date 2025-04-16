import React from 'react';
import { Box, Typography } from '@mui/material';

export const Message = ({ message }) => {
    const isUser = message.role === 'user';

    return (
        <Box
            alignSelf={isUser ? 'flex-end' : 'flex-start'}
            bgcolor={isUser ? '#DCF8C6' : '#F1F0F0'}
            color="black"
            p={1.5}
            px={2}
            borderRadius={2}
            maxWidth="70%"
            boxShadow={1}
        >
            <Typography variant="body2" fontWeight="bold" gutterBottom>
                {isUser ? 'Ви' : 'Асистент'}
            </Typography>
            <Typography variant="body1">
                {message.message}
            </Typography>
        </Box>
    );
};
