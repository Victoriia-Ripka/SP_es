import React from 'react';
import Box from '@mui/material/Box';
import { DataForm } from 'components/Form/Form';
import { PVTypeForm } from 'components/PVTypeForm/PVTypeForm';

export const FormsContainer = ({pvDesignData, pvTypeData, url}) => {

    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <PVTypeForm pvTypeData={pvTypeData} url={url} />

            <DataForm pvDesignData={pvDesignData} url={url}/>

        </Box>
    );
};
