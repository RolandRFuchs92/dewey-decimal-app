import React from 'react';
import {makeStyles} from '@material-ui/core';

import Icons from 'components/icons';

const useStyles = makeStyles(theme => ({
    edit: {
        fontSize: 20,
        color: theme.palette.info.main
    },
    delete: {
        fontSize: 20,
        color: theme.palette.error.main
    },
    footer: {
        color: theme.palette.success.main,
        fontSize: 30, 
        textAlign:'right', 
        paddingRight:15,
        alignSelf:'flex-end'
    },
}))

const DeleteComponent = ({handleClick}) => {
    const classes = useStyles();
    return <div onClick={handleClick} className={classes.delete}>
                         {Icons.Delete}
                    </div>
}

const EditComponent = ({handleClick}) => {
    const classes = useStyles();
    return <div onClick={handleClick} className={classes.edit}>
                {Icons.Edit}
        </div>
}

export default (handleEditAdd, handleDelete) => ([{
    name: "Edit",
    options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
            return <EditComponent handleClick={() => handleEditAdd(tableMeta.rowData)} />
        }
    }
    },  {
    name: "Delete",
    options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
                return <DeleteComponent handleClick={() => handleDelete(tableMeta.rowData)} />
            }
        }
    }]
)

export const useAddButton = (handleEditAdd) => {
    const classes = useStyles();
    return  ({customFooter: () => <td className={classes.footer} onClick={handleEditAdd}>{Icons.Add}</td>});
}