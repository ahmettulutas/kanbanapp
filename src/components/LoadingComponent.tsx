import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

const style= {
    opacity:1, color: 'blue.100',
    position: 'absolute', 
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}

export default function LoadingComponent() {
  return (
    <Stack sx={style} spacing={2} direction="row">
        <CircularProgress color='primary' />
    </Stack> 
)}
