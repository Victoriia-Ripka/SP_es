import React, { useEffect } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { useState } from 'react';

export const PVdesign = ({ pvOption }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalPower, setTotalPower] = useState(0);
    const [totalPanelsWeights, setTotalPanelsWeights] = useState(0);
    const [inverter, setInverter] = useState(null);
    const [panel, setPanel] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [charge, setCharge] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [additionalElements, setAdditionalElements] = useState(null);

    useEffect(() => {
        if (pvOption) {
            setTotalPrice(pvOption.total_price);
            setTotalPower(pvOption.total_power_kW);
            setTotalPanelsWeights(pvOption.total_panel_weight_kg);
            setInverter(pvOption.inverter);
            setPanel(pvOption.panel);
            if (pvOption.charge) {
                setCharge(pvOption.charge)
            }

        }
    }, [pvOption])

    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="h5" gutterBottom>
                Загальна інформація
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="subtitle1">Загальна потужність:</Typography>
                        <Typography>{totalPower || 'не визначено'} кВт</Typography>
                        <Typography variant="subtitle1">Загальна ціна:</Typography>
                        <Typography>{totalPrice || 'не визначено'} грн</Typography>
                        <Typography variant="subtitle1">Загальна вага панелей:</Typography>
                        <Typography>{totalPanelsWeights || 'не визначено'} кг</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Інвертор</Typography>
                        <Typography>Виробник: {inverter?.producer || 'не визначено'} </Typography>
                        <Typography>Модель: {inverter?.model || 'не визначено'}</Typography>
                        <Typography>Тип: {inverter?.type || 'не визначено'}</Typography>
                        <Typography>Ціна: {inverter?.price || 'не визначено'} грн</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Сонячна панель</Typography>
                        <Typography>Виробник: {panel?.producer || 'не визначено'}</Typography>
                        <Typography>Модель: {panel?.model || 'не визначено'}</Typography>
                        <Typography>Тип: {panel?.type || 'не визначено'}</Typography>
                        <Typography>Ціна: {panel?.price || 'не визначено'} грн</Typography>
                        <Typography>Орієнтація: {panel?.orientation || 'не визначено'}</Typography>
                        <Typography>Тип підключення: {panel?.panel_type_connection || 'не визначено'}</Typography>
                        <Typography>Кількість панелей: {panel?.number_panels_in_system || 'не визначено'}</Typography>
                        <Typography>Макс. потужність: {panel?.max_pv_power_for_params_kW || 'не визначено'} кВт</Typography>
                        <Typography>Напруга: {panel?.voltage || 'не визначено'} В</Typography>
                        <Typography>Струм: {panel?.current || 'не визначено'} А</Typography>
                    </Paper>
                </Grid>
            </Grid>

        </Box>
    );
};
