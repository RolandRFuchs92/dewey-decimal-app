import React from 'react';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    child: {
        fontSize:23,
        cursor: 'pointer',
        color: theme.palette.primary.light
    }
}));

type handleOpen = (rowData: object) => void;

export default (handleOpen:handleOpen, columnName:string, Icon: JSX.Element, className: string = useStyles().child) => {
    const newColumn =  {
        name: columnName,
        options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRender: (value: null, tableMeta: { rowData: object}) => {
            
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

type iconComponentModel ={
    onClick: (open: true) => void;
    children: JSX.Element;
    className: string
}

const IconComponent = ({onClick, children, className}: iconComponentModel) => {
    return <div onClick={() => onClick(true)} className={className}>
        {children}
    </div>
}
