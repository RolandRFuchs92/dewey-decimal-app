import {
  format,
  parse,
  addBusinessDays,
  addDays,
  differenceInBusinessDays
} from 'date-fns';

import { getStudentsWithBirthdays } from 'pages/student/Student.repo';
import { getBookByCallNumber as findBookByBarcode } from 'pages/books/book.repo';
import {
  getSelectList,
  getStudentSelectListSearch
} from 'pages/student/Student.repo';
import appSettings from 'appSettings.json';
import { JsonObj } from 'types/Generic';
import { CalculateCheckoutModel, CalculateCheckinModel } from './Home.type';

const { fines, formatDate, checkout } = appSettings;
export const getBirthdays = async () => {
  return await getStudentsWithBirthdays(format(new Date(), 'yyyy-MM-dd'));
};

export const getBookByCallNumber = async (callnumber: string) => {
  const data = await findBookByBarcode(callnumber);
  if (data === undefined) return null;

  if (data.student_name) return calculateCheckin(data);
  return calculateCheckout(data);
};

const calculateCheckout = async (data: CalculateCheckoutModel) => {
  data.isCheckout = true;
  data.return_on = checkout.isBusinessDays
    ? format(
        addBusinessDays(new Date(), checkout.daysAllowedOut),
        formatDate.to
      )
    : format(addDays(new Date(), checkout.daysAllowedOut), formatDate.to);

  data.check_out_date = format(new Date(), formatDate.to);
  data.fine = 'None';
  data.fetchStudents = getSelectList;
  return data;
};

const calculateCheckin = (data: CalculateCheckinModel) => {
  data.isCheckout = false;
  let check_out_date, return_on;

  check_out_date = parse(data.check_out_date, formatDate.from, new Date());
  return_on = parse(data.return_on, formatDate.from, new Date());
  const diffDays = differenceInBusinessDays(check_out_date, return_on);

  data.check_out_date = format(check_out_date, formatDate.to);
  data.check_in_on =
    data.check_in_on &&
    format(parse(data.check_in_on, formatDate.to, new Date()), formatDate.to);

  data.return_on = format(return_on, formatDate.to);

  if (!data.check_in_on && fines.isEnabled)
    data.fine = diffDays > 0 ? `R${diffDays * fines.rate}` : 'None';
  else data.fine = 'None';

  return data;
};

export const searchForStudentsSelect = async (value: string) => {
  if (value.length < 2) return [];

  return await getStudentSelectListSearch(value);
};
