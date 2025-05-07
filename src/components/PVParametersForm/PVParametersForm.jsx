import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const regionsList = [
    'АР Крим',
    'Вінницька область',
    'Волинська область',
    'Дніпропетровська область',
    'Донецька область',
    'Житомирська область',
    'Закарпатська область',
    'Запорізька область',
    'Івано-Франківська область',
    'Київська область',
    'Кіровоградська область',
    'Луганська область',
    'Львівська область',
    'Миколаївська область',
    'Одеська область',
    'Полтавська область',
    'Рівненська область',
    'Сумська область',
    'Тернопільська область',
    'Харківська область',
    'Херсонська область',
    'Хмельницька область',
    'Черкаська область',
    'Чернівецька область',
    'Чернігівська'
]

export const PVParametersForm = ({ pvDesignData, url, selectedPVTypes }) => {
    const [pvData, setPVData] = useState(pvDesignData);
    const [pvTypes, setPVTypes] = useState([]);

    useEffect(() => {
        setPVTypes(selectedPVTypes);
    }, [selectedPVTypes]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (pvData.pv_instalation_place === "земля") {
            setPVData({ ...pvData, roof_tilt: -1, roof_orientation: -1 })
        }

        console.log('Submitted data:', pvData);

        axios.post(`${url}/expert-system/designPV`, { pvData })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        const [parent, child] = name.split('.');
        if (child) {
            setPVData((prevData) => ({
                ...prevData,
                [parent]: {
                    ...prevData[parent],
                    [child]: value,
                },
            }));

        } else {
            setPVData({
                ...pvData,
                [name]: value,
            });
        }

        console.log(name, value)

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
                        label="Орієнтація даху (0° / 360°)"
                        name="roof_orientation"
                        type="number"
                        // inputProps={{ min: -90, max: 90, step: 1 }}
                        value={pvData.roof_orientation || ''}
                        onChange={handleChange}
                    />
                </>
            )}

            <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                    label="Довжина (м)"
                    name="pv_area.length"
                    type="number"
                    // inputProps={{ min: 1, step: 0.1 }}
                    value={pvData.pv_area.length}
                    onChange={handleChange}
                    required
                />

                <TextField
                    label="Ширина (м)"
                    name="pv_area.width"
                    type="number"
                    // inputProps={{ min: 1, step: 0.1 }}
                    value={pvData.pv_area.width}
                    onChange={handleChange}
                    required
                />
            </Box>

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
                        <MenuItem key={idx} value={item}>{item}</MenuItem>
                    )}
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel>Локалізація</FormLabel>
                <Select
                    label="Локалізація"
                    name="pv_location"
                    id="pv_location"
                    value={pvData.pv_location || ''}
                    onChange={handleChange}
                    required
                >
                    {regionsList.map((item, idx) =>
                        <MenuItem key={idx} value={item}>{item}</MenuItem>
                    )}
                </Select>
            </FormControl>

            <Button type="submit" variant="contained" color="success">
                Запроєктувати СЕС
            </Button>
        </Box>
    );
};
