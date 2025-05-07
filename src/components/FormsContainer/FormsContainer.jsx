import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { PVParametersForm } from 'components/PVParametersForm/PVParametersForm';
import { PVTypeForm } from 'components/PVTypeForm/PVTypeForm';

export const FormsContainer = ({pvDesignData, pvTypeData, url, setPvDesign}) => {
    const [selectedPVTypes, setSelectedPVTypes] = useState([]);

    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <PVTypeForm pvTypeData={pvTypeData} url={url} setSelectedPVTypes={setSelectedPVTypes} />

            <PVParametersForm pvDesignData={pvDesignData} url={url} selectedPVTypes={selectedPVTypes} setPvDesign={setPvDesign}/>
        </Box>
    );
};
