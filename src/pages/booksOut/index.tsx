import React from 'react';
import appSettings from 'appSettings.json';

import PageBase from 'components/page/PageBase';
import repo, { getBooksForSelect, getStudentsForSelect } from './booksout.repo';
import { DefaultColumnModel } from 'components/page/PageBase.type';
const {
  tables: { books_out, book, student }
} = appSettings;

const defaultColumns: DefaultColumnModel[] = [
  {
    name: books_out.pk,
    label: 'Id',
    type: 'header',
    value: 'Dewey Summary 3'
  },
  {
    name: book.pk,
    options: {
      display: 'false'
    }
  },
  {
    name: 'book_name',
    label: `Book`,
    ref: book.pk,
    type: 'select',
    getDropDownItems: getBooksForSelect
  },
  {
    name: student.pk,
    options: {
      display: 'false'
    }
  },
  {
    name: 'student_name',
    label: 'Student',
    type: 'select',
    ref: student.pk,
    getDropDownItems: getStudentsForSelect
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
  const handleDeleteRow = repo.deleteRow;
  const handleEditAddRow = repo.addOrUpdate;
  const getAll = repo.getAll;

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
