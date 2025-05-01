import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Select, MenuItem } from '@mui/material';
import axios from 'axios';

export const PVParametersForm = ({ pvDesignData, url, selectedPVTypes }) => {
    const [pvData, setPVData] = useState(pvDesignData);
    const [pvTypes, setPVTypes] = useState([]);

    useEffect(() => {
        setPVTypes(selectedPVTypes);
    }, [selectedPVTypes]);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted data:', pvData);

        axios.post(`${url}/expert-system/designPV`, {pvData})
        .then()
        .catch( err => console.log(err))
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setPVData({
            ...pvData,
            [name]: value,
        });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 5 }}>
            <Typography variant="h6">Параметри сонячної електростанції</Typography>

            <TextField
                label="PV Потужність (кВт)"
                name="pv_power"
                type="number"
                // inputProps={{ min: 1.0, max: 15.0, step: 0.1 }}
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
                    required
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
                        // inputProps={{ min: 0, max: 90, step: 1 }}
                        value={pvData.roof_tilt || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Орієнтація даху (-90° / +90°)"
                        name="roof_orientation"
                        type="number"
                        // inputProps={{ min: -90, max: 90, step: 1 }}
                        value={pvData.roof_orientation || ''}
                        onChange={handleChange}
                    />
                </>
            )}

            <TextField
                label="Площа PV (м²)"
                name="pv_area"
                type="number"
                // inputProps={{ min: 1, step: 0.1 }}
                value={pvData.pv_area}
                onChange={handleChange}
                required
            />

            <FormControl>
                <FormLabel>Обраний тип СЕС</FormLabel>
                <Select
                    label="Тип СЕС"
                    name="pv_type"
                    id="pv_type"
                    value={pvData.pv_type || ''}
                    onChange={handleChange}
                    required
                >
                    {pvTypes.map((item, idx) => 
                        <MenuItem key={idx} value={ item }>{item}</MenuItem>
                    )}
                </Select>
            </FormControl>

            <TextField
                label="Локалізація"
                name="pv_location"
                type="string"
                value={pvData.pv_location}
                onChange={handleChange}
                required
            />

            <Button type="submit" variant="contained" color="success">
                Запроєктувати СЕС
            </Button>
        </Box>
    );
};
