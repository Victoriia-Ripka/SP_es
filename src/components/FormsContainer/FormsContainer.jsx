import * as React from 'react';
import Box from '@mui/material/Box';
import { DataForm } from 'components/Form/Form';
import { PVTypeForm } from 'components/PVTypeForm/PVTypeForm';

export const FormsContainer = (userData) => {
    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <PVTypeForm userData={userData} />

            <DataForm userData={userData} />

        </Box>
    );
};
