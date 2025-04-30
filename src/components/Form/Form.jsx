import React, { useState } from 'react';
import { Box, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox, Typography } from '@mui/material';
import axios from 'axios';

export const DataForm = (userData) => {
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
            <Typography variant="h6">Параметри сонячної електростанції</Typography>

            <TextField
                label="PV Потужність (кВт)"
                name="pv_power"
                type="number"
                inputProps={{ min: 0.01, max: 14.99, step: 0.01 }}
                value={pvData.pv_power}
                onChange={handleChange}
                required
            />

            <FormControl>
                <FormLabel>Місце встановлення</FormLabel>
                <RadioGroup
                    name="pv_instalation_place"
                    value={pvData.pv_instalation_place}
                    onChange={handleChange}
                    row
                >
                    <FormControlLabel value="дах" control={<Radio />} label="Дах" />
                    <FormControlLabel value="земля" control={<Radio />} label="Земля" />
                </RadioGroup>
            </FormControl>

            {pvData.pv_instalation_place === 'дах' && (
                <>
                    <TextField
                        label="Кут нахилу даху (0–90°)"
                        name="roof_tilt"
                        type="number"
                        inputProps={{ min: 0, max: 90 }}
                        value={pvData.roof_tilt || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Орієнтація даху (0–180°)"
                        name="roof_orientation"
                        type="number"
                        inputProps={{ min: 0, max: 180 }}
                        value={pvData.roof_orientation || ''}
                        onChange={handleChange}
                    />
                </>
            )}

            <TextField
                label="Площа PV (м²)"
                name="pv_area"
                type="number"
                inputProps={{ min: 0.01, step: 0.01 }}
                value={pvData.pv_area}
                onChange={handleChange}
                required
            />

            <Button type="submit" variant="contained" color="success">
                Запроєктувати СЕС
            </Button>
        </Box>
    );
};
