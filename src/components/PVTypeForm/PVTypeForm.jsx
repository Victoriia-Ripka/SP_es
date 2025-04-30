import React, { useState } from 'react';
import { Box, Button, FormControlLabel, Checkbox, Typography, ToggleButtonGroup, ToggleButton, FormLabel } from '@mui/material';
import axios from 'axios';

export const PVTypeForm = (userData) => {
    const [pvData, setPVData] = useState(userData);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted data:', pvData);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPVData({
            ...pvData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 5 }}>
            <Typography variant="h6">Вибір типу СЕС</Typography>

            <FormLabel sx={{ mb: 1 }}>Чи важлива електрична автономність?</FormLabel>
            <ToggleButtonGroup
                color="primary"
                exclusive
                value={pvData.is_electric_autonomy_important ? 'true' : 'false'}
                onChange={(e, newValue) => {
                    if (newValue !== null) {
                        setPVData({ ...pvData, is_electric_autonomy_important: newValue === 'true' });
                    }
                }}
            >
                <ToggleButton value="true">Так</ToggleButton>
                <ToggleButton value="false">Ні</ToggleButton>
            </ToggleButtonGroup>

            <FormLabel sx={{ mb: 1 }}>Чи можливе підключення до електромережі?</FormLabel>
            <ToggleButtonGroup
                color="primary"
                exclusive
                value={pvData.is_possible_electricity_grid_connection ? 'true' : 'false'}
                onChange={(e, newValue) => {
                    if (newValue !== null) {
                        setPVData({ ...pvData, is_possible_electricity_grid_connection: newValue === 'true' });
                    }
                }}
            >
                <ToggleButton value="true">Так</ToggleButton>
                <ToggleButton value="false">Ні</ToggleButton>
            </ToggleButtonGroup>

            <FormLabel sx={{ mb: 1 }}>Чи існує обмеження бюджету?</FormLabel>
            <ToggleButtonGroup
                color="primary"
                exclusive
                value={pvData.is_exist_money_limit ? 'true' : 'false'}
                onChange={(e, newValue) => {
                    if (newValue !== null) {
                        setPVData({ ...pvData, is_exist_money_limit: newValue === 'true' });
                    }
                }}
            >
                <ToggleButton value="true">Так</ToggleButton>
                <ToggleButton value="false">Ні</ToggleButton>
            </ToggleButtonGroup>

            <Button type="submit" variant="contained" color="success">
                Визначити тип СЕС
            </Button>
        </Box>
    );
};
