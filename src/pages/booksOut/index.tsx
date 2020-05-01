import React from 'react';

import appSettings from 'appSettings.json';
import PageBase from 'components/page/PageBase';
import { DefaultColumnModel } from 'components/page/PageBase.type';
import serviceBase from './Booksout.service';
// import repo, { getBooksForSelect, getStudentsForSelect } from './Booksout.repo';
import { TableBooksOutSchema } from './Booksout.type';

const {
  tables: { books_out, book, student }
} = appSettings;

const defaultColumns: DefaultColumnModel<TableBooksOutSchema>[] = [
  {
    name: 'books_out_id',
    label: 'Id',
    type: 'header',
    modalTitle: 'Dewey Summary 3'
  },
  {
    name: 'book_id',
    options: {
      display: 'false'
    }
  },
  {
    name: 'book_name',
    label: `Book`,
    ref: 'book_id',
    type: 'select'
    // getDropDownItems: getBooksForSelect
  },
  {
    name: 'student_id',
    options: {
      display: 'false'
    }
  },
  {
    name: 'student_name',
    label: 'Student',
    type: 'select',
    ref: 'student_id'
    // getDropDownItems: getStudentsForSelect
  },
  {
    name: 'return_on',
    label: 'Return On',
    type: 'date'
  },
  {
    name: 'check_out_date',
    label: 'Checked out on',
    type: 'date'
  },
  {
    name: 'check_in_date',
    label: 'Checked in on',
    type: 'date'
  }
];

export default () => {
  const handleDeleteRow = serviceBase.deleteFunc;
  const handleEditAddRow = serviceBase.addOrUpdate;
  const getAll = serviceBase.getAll;

  return (
    <PageBase
      defaultColumns={defaultColumns}
      getAll={getAll}
      handleDeleteRow={handleDeleteRow}
      handleEditAddRow={handleEditAddRow}
      dialogKey="book_name"
    />
  );
};
