import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper } from '@mui/material';

export const ExtraPVElement = ({ element, elName }) => {
    const [price, setPrice] = useState(0);
    const [model, setModel] = useState('');
    const [producer, setProducer] = useState('');
    const [type, setType] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        if (element) {
            setPrice(element.price);
            setModel(element.model);
            setType(element.type);
            setProducer(element.producer);

            if(elName === 'counters'){
                setName('лічильник');
            }
            if(elName === 'distribution_boards'){
                setName('розподільний щит');
            }
        }
    }, [element, elName]);

    return (
        <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'left', fontWeight: 'bold' }}>Додатковий елемент {name}</Typography>
                <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }}>Виробник: {producer || 'не визначено'}</Typography>
                <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }}>Модель: {model || 'не визначено'}</Typography>
                <Typography sx={{ textAlign: 'left' }}>Тип: {type || 'не визначено'}</Typography>
                <Typography sx={{ textAlign: 'left' }}>Ціна: {price || 'не визначено'} грн (не враховано у загальну ціну)</Typography>
            </Paper>
        </Grid>
    );
};
