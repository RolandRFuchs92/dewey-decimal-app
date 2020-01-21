import React from 'react';

import { Button } from '@material-ui/core';

export function ResetButton({onClick}) {
    return <Button color="secondary" variant='text' onClick={onClick}>Reset</Button>
}

export function SubmitButton({onClick}){
    return <Button color="primary" variant="contained" onClick={onClick}>Submit</Button>
}