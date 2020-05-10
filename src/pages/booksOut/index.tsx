import React from 'react';

import PageBase from 'components/page/PageBase';
import { DefaultColumnModel } from 'components/page/PageBase.type';
import { getDropdownList as getStudentDropdownList } from 'pages/student/Student.service';

import serviceBase from './Booksout.service';
import { TableBooksOutSchema, BooksOutSchema } from './Booksout.type';
import { getBooksDropdownList } from 'pages/books/Book.service';

const defaultColumns: DefaultColumnModel<
  TableBooksOutSchema,
  BooksOutSchema
>[] = [
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
    type: 'select',
    getDropDownItems: getBooksDropdownList
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
    ref: 'student_id',
    getDropDownItems: getStudentDropdownList
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
      primaryKey="book_id"
    />
  );
};
