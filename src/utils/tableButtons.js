import React from 'react';
import {TableFooter, TableRow, TableCell, makeStyles} from "@material-ui/core";
import MuiTablePagination from "@material-ui/core/TablePagination";

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
    addButton: {
        color: theme.palette.success.main,
        textAlign:'right', 
        padding:10,
        alignSelf:'flex-end',
        '& svg': {
            fontSize: 30
        }
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
    return  ({customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) => (  
        <>
            <CustomFooter 
                count={count} 
                page={page} 
                rowsPerPage={rowsPerPage} 
                changeRowsPerPage={changeRowsPerPage} 
                changePage={changePage} 
                textLabels={textLabels} >
                <div className={classes.addButton} onClick={handleEditAdd}>{Icons.Add}</div>
            </CustomFooter>
        </>
    )});
}




class CustomFooter extends React.Component {

  handleRowChange = event => {
    this.props.changeRowsPerPage(event.target.value);
  };

  handlePageChange = (_, page) => {
    this.props.changePage(page);
  };

  render() {
    const { count, classes, textLabels, rowsPerPage, page } = this.props;

    const footerStyle = {
      display:'flex', 
      justifyContent: 'flex-end',
      padding: '0px 24px 0px 24px'
    };

    return (
      <TableFooter>
        <TableRow>
            {this.children && this.children[0]}
            <TableCell style={footerStyle} colSpan={1000}>
                <MuiTablePagination
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage={textLabels.rowsPerPage}
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${textLabels.displayRows} ${count}`}
                backIconButtonProps={{
                    'aria-label': textLabels.previous,
                }}
                nextIconButtonProps={{
                    'aria-label': textLabels.next,
                }}
                rowsPerPageOptions={[10,20,100]}
                onChangePage={this.handlePageChange}
                onChangeRowsPerPage={this.handleRowChange}
                />
                {this.props.children}
            </TableCell>
        </TableRow>
      </TableFooter>
    );
  }

}