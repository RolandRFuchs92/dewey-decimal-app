import React from 'react';

import {onClickModel} from 'types/buttons'

import { Button } from '@material-ui/core';

export function ResetButton({onClick}: onClickModel) {
    return <Button color="secondary" variant='text' onClick={onClick}>Reset</Button>
}

export function SubmitButton({onClick}: onClickModel){
    return <Button color="primary" variant="contained" onClick={onClick}>Submit</Button>
}