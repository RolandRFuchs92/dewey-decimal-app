import React from 'react';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    child: {
        fontSize:23,
        cursor: 'pointer',
        color: theme.palette.primary.light
    }
}));

export default (handleOpen, columnName, Icon, className = useStyles().child) => {
    const newColumn =  {
        name: columnName,
        options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRender: (value, tableMeta, updateValue) => {
            
            return (
                <IconComponent onClick={() => handleOpen(tableMeta.rowData)} className={className}> 
                    {Icon}
                </IconComponent>
            );
            }
        }
    }
    return newColumn;
}

const IconComponent = ({onClick, children, className}) => {
    return <div onClick={() => onClick(true)} className={className}>
        {children}
    </div>
}
