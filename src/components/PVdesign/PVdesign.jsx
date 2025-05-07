import React, { useEffect } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { useState } from 'react';

export const PVdesign = ({ pvOption }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalPower, setTotalPower] = useState(0);
    const [totalPanelsWeights, setTotalPanelsWeights] = useState(0);
    const [inverter, setInverter] = useState(null);
    const [panel, setPanel] = useState(null);
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
                        <Typography variant="subtitle1" sx={{ textAlign: 'left', fontWeight: 'bold' }}>Загальна потужність:</Typography>
                        <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }}>{totalPower || 'не визначено'} кВт</Typography>
                        <Typography sx={{ textAlign: 'left' }} variant="subtitle1">Загальна ціна:</Typography>
                        <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }}>{totalPrice || 'не визначено'} грн</Typography>
                        <Typography sx={{ textAlign: 'left' }} variant="subtitle1">Загальна вага панелей:</Typography>
                        <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }}>{totalPanelsWeights || 'не визначено'} кг</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom sx={{ textAlign: 'left', fontWeight: 'bold' }}>Інвертор</Typography>
                        <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }}>Виробник: {inverter?.producer || 'не визначено'} </Typography>
                        <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }}>Модель: {inverter?.model || 'не визначено'}</Typography>
                        <Typography sx={{ textAlign: 'left' }}>Тип: {inverter?.type || 'не визначено'}</Typography>
                        <Typography sx={{ textAlign: 'left' }}>Ціна: {inverter?.price || 'не визначено'} грн</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom sx={{ textAlign: 'left', fontWeight: 'bold' }}>Сонячна панель</Typography>
                        <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }}>Виробник: {panel?.producer || 'не визначено'}</Typography>
                        <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }}>Модель: {panel?.model || 'не визначено'}</Typography>
                        <Typography sx={{ textAlign: 'left' }}>Тип: {panel?.type || 'не визначено'}</Typography>
                        <Typography sx={{ textAlign: 'left' }}>Ціна: {panel?.price || 'не визначено'} грн</Typography>
                        <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }}>Орієнтація: {panel?.orientation || 'не визначено'}</Typography>
                        <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }}>Тип підключення: {panel?.panel_type_connection || 'не визначено'}</Typography>
                        <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }}>Кількість панелей: {panel?.number_panels_in_system || 'не визначено'}</Typography>
                        <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }}>Макс. потужність: {panel?.max_pv_power_for_params_kW || 'не визначено'} кВт</Typography>
                        <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }}>Напруга: {panel?.voltage || 'не визначено'} В</Typography>
                        <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }}>Струм: {panel?.current || 'не визначено'} А</Typography>
                    </Paper>
                </Grid>

                {charge && (
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom sx={{ textAlign: 'left', fontWeight: 'bold' }}>АКБ</Typography>
                            <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }}>Виробник: {charge?.producer || 'не визначено'} </Typography>
                            <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }}>Серія: {charge?.seria || 'не визначено'}</Typography>
                            <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }}>Модель: {charge?.model || 'не визначено'}</Typography>
                            <Typography sx={{ textAlign: 'left' }}>Тип: {charge?.battery_technology || 'не визначено'}</Typography>
                            <Typography sx={{ textAlign: 'left' }}>Ціна: {charge?.price || 'не визначено'} грн</Typography>
                            <Typography sx={{ textAlign: 'left' }}>Кількість АКБ: {charge?.charge_count || 'не визначено'}</Typography>
                            <Typography sx={{ textAlign: 'left' }}>Загальна ємність: {charge?.total_charge_capacity_kWh || 'не визначено'} кВт*Год</Typography>
                        </Paper>
                    </Grid>
                )}
            </Grid>

        </Box>
    );
};
