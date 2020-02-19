import React from 'react';

import { Grid } from '@material-ui/core'

import Tabs from 'components/tabs';

import Summary1 from './summary1';
import Summary2 from './summary2';
import Summary3 from './summary3';
import Decimal from './decimal';

export default () => {
    const tabs = [
        {
            label: 'Dewey Decimals',
            content: <Decimal></Decimal>
        },
        {
            label:"Summary 1",
            content: <Summary1></Summary1>
        },
        {
            label: `Summary 2`,
            content: <Summary2></Summary2>
        },
        {
            label: `Summary 3`,
            content: <Summary3></Summary3>
        },
    ]


    return <Grid container>
        <Tabs tabs={tabs}></Tabs>
    </Grid>
}