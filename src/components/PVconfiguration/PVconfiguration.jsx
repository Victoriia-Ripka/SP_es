import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { PVdesign } from 'components/PVdesign/PVdesign';

export const PVconfigurationContainer = ({ pvDesignOptions }) => {
    const [pvType, setPvType] = useState(null);
    const [optimalPlace, setOptimalPlace] = useState(null);
    const [optimalOrientation, setOptimalOrientation] = useState(null);
    const [optimalAngle, setOptimalAngle] = useState(null);
    const [pvElements, setPvElements] = useState([]);
    const [pvOptions, setPvOptions] = useState([]);

    useEffect(() => {
        if (pvDesignOptions) {
            setPvType(pvDesignOptions.pv_type || null);
            setOptimalPlace(pvDesignOptions.optimalPVPlace || null);
            setOptimalOrientation(pvDesignOptions.optimalPVOrientation || null);
            setOptimalAngle(pvDesignOptions.optimalPVAngle || null);
            setPvElements(Array.isArray(pvDesignOptions.pvElements) ? [...pvDesignOptions.pvElements] : []);
            setPvOptions(Array.isArray(pvDesignOptions.options) ? [...pvDesignOptions.options] : []);
        }
    }, [pvDesignOptions]);

    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <Typography>Тип СЕС: {pvType || 'не визначено'}</Typography>
            <Typography>Місце розташування СЕС: {optimalPlace || 'не визначено'} </Typography>
            <Typography>Оптимальна орієнтація фотопанелей СЕС: {optimalOrientation || 'не визначено'}* </Typography>
            <Typography>Оптимальний кут нахилу фотопанелей: {optimalAngle || 'не визначено'}* </Typography>
            <Typography>Елементи СЕС:{pvElements || 'не визначено'} </Typography>

            {pvOptions?.length > 0 &&
                pvOptions.map((option, idx) =>
                    <PVdesign key={idx} pvOption={option} />
                )
            }
        </Box>
    );
};
