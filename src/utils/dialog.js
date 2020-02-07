import React from 'react';

import {useConfirm} from 'material-ui-confirm';



export const useDialog = ()=> {
    const confirm = useConfirm();   
    return ({title = 'Are you sure?', description = '', handleYes, handleNo}) => 
    confirm({
        title, 
        description,
        confirmationText: 'Yes',
        cancellationText: 'No'
    }).then(() => handleYes && handleYes())
    .catch(() => handleNo && handleNo());
}