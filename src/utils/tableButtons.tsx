import * as React from 'react';
import {
  TableFooter,
  TableRow,
  TableCell,
  makeStyles
} from '@material-ui/core';
import MuiTablePagination from '@material-ui/core/TablePagination';

import { OnClickModel, JsonObj } from 'types/generic.type';
import Icons from 'components/icons';
import { isNil } from 'lodash';
import { DefaultColumnModel } from 'components/page/PageBase.type';

const useStyles = makeStyles(theme => ({
  edit: {
    fontSize: 20,
    color: theme.palette.info.main,
    cursor: 'pointer'
  },
  delete: {
    fontSize: 20,
    color: theme.palette.error.main,
    cursor: 'pointer'
  },
  addButton: {
    color: theme.palette.success.main,
    textAlign: 'right',
    padding: 10,
    alignSelf: 'flex-end',
    '& svg': {
      fontSize: 30
    }
  }
}));

const DeleteComponent = ({ handleClick }: { handleClick: OnClickModel }) => {
  const classes = useStyles();
  return (
    <div onClick={handleClick} className={classes.delete}>
      {Icons.Delete}
    </div>
  );
};

const EditComponent = ({ handleClick }: { handleClick: OnClickModel }) => {
  const classes = useStyles();
  return (
    <div onClick={handleClick} className={classes.edit}>
      {Icons.Edit}
    </div>
  );
};

export function tableButton(
  label: string,
  onClick: (rowData: JsonObj) => void,
  className: string,
  icon: keyof typeof Icons
) {
  return {
    name: 'custom',
    label: label,
    options: {
      filter: false,
      sort: false,
      empty: true,
      customBodyRender: (
        value: string,
        tableMeta: { rowData: JsonObj },
        updateValue: any
      ) => {
        return (
          <div onClick={() => onClick(tableMeta.rowData)} className={className}>
            {Icons[icon]}
          </div>
        );
      }
    }
  };
}

type HandleEditAddModel = (event: JsonObj) => void;

export default (
  handleEditAdd: HandleEditAddModel,
  handleDelete: HandleEditAddModel
): DefaultColumnModel[] => [
  {
    name: 'Edit',
    label: '',
    options: {
      filter: false,
      sort: false,
      empty: true,
      customBodyRender: (
        value: string,
        tableMeta: { rowData: JsonObj },
        updateValue: any
      ) => {
        return (
          <EditComponent handleClick={() => handleEditAdd(tableMeta.rowData)} />
        );
      }
    }
  },
  {
    name: 'Delete',
    label: '',
    options: {
      filter: false,
      sort: false,
      empty: true,
      customBodyRender: (
        value: string,
        tableMeta: { rowData: JsonObj },
        updateValue: any
      ) => {
        return (
          <DeleteComponent
            handleClick={() => handleDelete(tableMeta.rowData)}
          />
        );
      }
    }
  }
];

type TextLabelsModel = {
  rowsPerPage: number;
  displayRows: number;
  previous: string;
  next: string;
};
type CustomFooterModel = {
  count: number;
  textLabels: TextLabelsModel;
  rowsPerPage: number;
  page: number;
  children: JSX.Element | JSX.Element[];
  changePage: (params: any) => React.ReactNode;
  changeRowsPerPage: (val: string) => void;
};

export const addButton = (handleEditAdd: HandleEditAddModel) => {
  return {
    customFooter: (
      count: number,
      page: number,
      rowsPerPage: number,
      changeRowsPerPage: (val: string) => void,
      changePage: (params: any) => React.ReactNode,
      textLabels: TextLabelsModel
    ): React.ReactNode => (
      <>
        <CustomFooter
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          changeRowsPerPage={changeRowsPerPage}
          changePage={changePage}
          textLabels={textLabels}
        >
          <AddButton handleEditAdd={handleEditAdd} />
        </CustomFooter>
      </>
    )
  };
};

function AddButton({ handleEditAdd }: { handleEditAdd: HandleEditAddModel }) {
  const classes = useStyles();

  return (
    <div className={classes.addButton} onClick={() => handleEditAdd({})}>
      {Icons.Add}
    </div>
  );
}

function CustomFooter({
  count,
  textLabels,
  rowsPerPage,
  page,
  changeRowsPerPage,
  changePage,
  children
}: CustomFooterModel) {
  const handleRowChange = (event: { target: { value: string } }) => {
    changeRowsPerPage(event.target.value);
  };

  const handlePageChange = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ): void => {
    changePage(page);
  };

  const footerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0px 24px 0px 24px'
  };

  return (
    <TableFooter>
      <TableRow>
        {Array.isArray(children) && children[0]}
        <TableCell style={footerStyle} colSpan={1000}>
          <MuiTablePagination
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage={!isNil(textLabels) && textLabels.rowsPerPage}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} ${!isNil(textLabels) &&
                textLabels.displayRows} ${count}`
            }
            backIconButtonProps={{
              'aria-label': textLabels.previous
            }}
            nextIconButtonProps={{
              'aria-label': textLabels.next
            }}
            rowsPerPageOptions={[10, 20, 100]}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowChange}
          />
          {children}
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}
