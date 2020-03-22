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
import { CalculateCheckoutModel, CalculateCheckinModel } from './Home.type';
import { GetBookCallNumberModel } from 'pages/books/Book.type';

const { fines, formatDate, checkout } = appSettings;
export const getBirthdays = async () => {
  return await getStudentsWithBirthdays(format(new Date(), 'yyyy-MM-dd'));
};

export const getBookByCallNumber = async (callnumber: string) => {
  const data = (await findBookByBarcode(callnumber))[0];
  if (data === undefined) return null;

  if (data.student_name) return calculateCheckin(data);
  return calculateCheckout(data);
};

const calculateCheckout = async (
  data: GetBookCallNumberModel
): Promise<CalculateCheckoutModel> => {
  const isCheckout = true;
  const return_on = checkout.isBusinessDays
    ? format(
        addBusinessDays(new Date(), checkout.daysAllowedOut),
        formatDate.to
      )
    : format(addDays(new Date(), checkout.daysAllowedOut), formatDate.to);

  const check_out_date = format(new Date(), formatDate.to);
  const fine = 'None';
  const fetchStudents = getSelectList;

  const checkoutResult: CalculateCheckoutModel = {
    check_out_date,
    fine,
    isCheckout,
    return_on,
    fetchStudents
  };

  return checkoutResult;
};

const calculateCheckin = (
  data: GetBookCallNumberModel
): CalculateCheckinModel => {
  const isCheckout = false;
  let check_out_date = parse(
    data.check_out_date.toString(),
    formatDate.from,
    new Date()
  );
  let return_on = parse(data.return_on.toString(), formatDate.from, new Date());
  const diffDays = differenceInBusinessDays(check_out_date, return_on);

  let fine;
  if (!data.check_in_date && fines.isEnabled)
    fine = diffDays > 0 ? `R${diffDays * fines.rate}` : 'None';
  else fine = 'None';

  const result: CalculateCheckinModel = {
    isCheckout,
    check_out_date: format(check_out_date, formatDate.to),
    check_in_on:
      data.check_in_date &&
      format(
        parse(data.check_in_date.toString(), formatDate.to, new Date()),
        formatDate.to
      ),
    return_on: format(return_on, formatDate.to),
    fine
  };

  return result;
};

export const searchForStudentsSelect = async (value: string) => {
  if (value.length < 2) return [];

  return await getStudentSelectListSearch(value);
};
