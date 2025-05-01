import React, { useState } from 'react';
import { Box, Button, Typography, ToggleButtonGroup, ToggleButton, FormLabel } from '@mui/material';
import axios from 'axios';

export const PVTypeForm = ({ pvTypeData, url, setSelectedPVTypes }) => {
    const [is_electric_autonomy_important, setIsElectricAutonomyImportant] = useState(pvTypeData.is_electric_autonomy_important);
    const [is_possible_electricity_grid_connection, setIsPossibleElectricityGridConnection] = useState(pvTypeData.is_possible_electricity_grid_connection);
    const [is_exist_money_limit, setIsExistMoneyLimit] = useState(pvTypeData.is_exist_money_limit);

    const [pvType, setPvType] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${url}/expert-system/setPVtype`, { is_electric_autonomy_important, is_possible_electricity_grid_connection, is_exist_money_limit }).then(
            res => {
                const data = res.data;
                setPvType(data.type);
                setSelectedPVTypes(data.type);
            }
        ).catch(err => console.log(err))
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 5 }}>
            <Typography variant="h6">Вибір типу СЕС</Typography>

            <FormLabel sx={{ mb: 1 }}>Чи важлива електрична автономність?</FormLabel>
            <ToggleButtonGroup
                color="primary"
                exclusive
                value={is_electric_autonomy_important ? 'true' : 'false'}
                onChange={(e, newValue) => {
                    if (newValue !== null) {
                        setIsElectricAutonomyImportant(newValue === 'true');
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
                value={is_possible_electricity_grid_connection ? 'true' : 'false'}
                onChange={(e, newValue) => {
                    if (newValue !== null) {
                        setIsPossibleElectricityGridConnection(newValue === 'true');
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
                value={is_exist_money_limit ? 'true' : 'false'}
                onChange={(e, newValue) => {
                    if (newValue !== null) {
                        setIsExistMoneyLimit(newValue === 'true');
                    }
                }}
            >
                <ToggleButton value="true">Так</ToggleButton>
                <ToggleButton value="false">Ні</ToggleButton>
            </ToggleButtonGroup>

            <Button type="submit" variant="contained" color="success">
                Визначити тип СЕС
            </Button>

            {pvType.length > 0 && (
                <>
                    <Typography> Тип СЕС, що підходить для ваших потреб: </Typography>
                    <Box>
                        {
                            pvType.length > 1
                                ? (pvType.map((el, index) => (
                                    <Typography key={index}>{el}</Typography>
                                )))
                                : (<Typography>{pvType[0]}</Typography>)
                        }
                    </Box>
                </>
            )}
        </Box>
    );
};
