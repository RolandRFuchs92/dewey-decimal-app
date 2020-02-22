import { format } from 'date-fns';

import { getStudentsWithBirthdays } from 'pages/student/Student.repo';
import { getBookByCallNumber as findBookByBarcode } from 'pages/books/book.repo';

export const getBirthdays = async () => {
    return await getStudentsWithBirthdays(format(new Date(), 'yyyy-MM-dd'));
}

export const getBookByCallNumber = async (callnumber) => {
    return await findBookByBarcode(callnumber);
}