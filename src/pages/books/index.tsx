import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

import Icons from 'components/icons';
// import { getSelectList as getAuthorsSelectList } from 'pages/authors/authors.repo';
// import { getSelectList as getDecimalSelectList } from 'pages/deweySystem/decimal/Decimal.repo';
import { DefaultColumnModel } from 'components/page/PageBase.type';
import { BarcodeModel } from 'components/printCodes/PrintCodes.type';
import { JsonObj } from 'types/generic.type';

import BarcodePage from './Book.barcode';
import PageBase from 'components/page/PageBase';
import serviceBase from './Book.service';
// import repo from './Book.repo';
import { TableBookSchema, BookSchema } from './Book.type';

const useStyles = makeStyles(theme => ({
  barcode: {
    fontSize: 25,
    cursor: 'pointer'
  }
}));

const defaultColumns: DefaultColumnModel<TableBookSchema, BookSchema>[] = [
  {
    name: 'book_id',
    label: 'Id',
    type: 'header',
    modalTitle: 'Book'
  },
  {
    name: 'author_id',
    options: {
      display: 'false'
    }
  },
  {
    name: 'decimal_id',
    options: {
      display: 'false'
    }
  },
  {
    name: 'call_number',
    label: 'Call number',
    type: 'text'
  },
  {
    name: 'name',
    label: 'Name',
    type: 'text'
  },
  {
    name: 'author_name',
    label: 'Author',
    ref: 'author_id',
    type: 'select'
    // getDropDownItems: getAuthorsSelectList
  },
  {
    name: 'dewey_decimal_name',
    label: 'Deciaml Name',
    ref: 'decimal_id',
    type: 'select'
    // getDropDownItems: getDecimalSelectList
  },
  {
    name: 'publisher',
    label: 'Publisher',
    type: 'text'
  }
];

export default () => {
  const [barcodeIsOpen, setBarcodeIsOpen] = useState(false);
  const [barcode, setBarcode] = useState<BarcodeModel>({
    value: '',
    description: ''
  });
  const handleDeleteRow = serviceBase.deleteFunc;
  const handleEditAddRow = serviceBase.addOrUpdate;
  const getAll = serviceBase.getAll;

  const handleBarcodeClose = () => setBarcodeIsOpen(false);
  const handleBarcodeOpen = (rowData: TableBookSchema) => {
    const data = objectFromRowData(rowData);
    setBarcode({
      value: data.call_number,
      description: data.name
    });
    setBarcodeIsOpen(true);
  };

  // @ts-ignore
  const columns = defaultColumns.concat(createBarcodeButton(handleBarcodeOpen));

  const objectFromRowData = (rowData: TableBookSchema) => {
    const rowAsColumn = Object.keys(rowData);
    return Object.fromEntries(
      columns.map(({ name }, index: number) => [name, rowAsColumn[index] || ''])
    );
  };

  return (
    <>
      <PageBase<TableBookSchema, BookSchema>
        defaultColumns={columns}
        getAll={getAll}
        handleDeleteRow={handleDeleteRow}
        handleEditAddRow={handleEditAddRow}
        dialogKey="name"
        primaryKey="book_id"
      />
      <BarcodePage
        open={barcodeIsOpen}
        handleClose={handleBarcodeClose}
        value={barcode.value}
        description={barcode.description}
      />
    </>
  );
};

const createBarcodeButton = (
  handleBarcodeOpen: (barcodeData: JsonObj) => void
) => {
  const newColumn = {
    name: 'Barcode',
    options: {
      filter: false,
      sort: false,
      empty: true,
      customBodyRender: (_: unknown, tableMeta: { rowData: JsonObj }) => {
        return (
          <BarcodeComponent
            onClick={() => {
              handleBarcodeOpen(tableMeta.rowData);
            }}
          ></BarcodeComponent>
        );
      }
    }
  };
  return newColumn;
};

const BarcodeComponent = ({
  onClick
}: {
  onClick: (openComponent: true) => void;
}) => {
  const classes = useStyles();
  return (
    <div onClick={() => onClick(true)} className={classes.barcode}>
      {Icons.Barcode}
    </div>
  );
};
