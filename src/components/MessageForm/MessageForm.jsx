import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

export const MessageForm = ({ onSend }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() === '') return;
        onSend(message);
        setMessage('');
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, my: 5 }}>
            <TextField
                fullWidth
                id="user-input"
                color="success"
                label="Введи запит тут"
                variant="standard"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit" variant="contained" color="success">
                Надіслати
            </Button>
        </Box>
    );
};
