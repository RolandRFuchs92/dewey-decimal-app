import {format, addBusinessDays, addDays} from 'date-fns';

import repoBase from 'components/page/repo.base';
import { getBooksSelectList } from 'pages/books/book.repo';
import { getSelectList } from 'pages/student/Student.repo';
import { all, run } from 'db/repo';
import appSettings from 'appSettings';
import { calculateReturnOnDateForDbInsert, formatDateForDbInsert } from 'utils/businessRules';

const getAllQuery = `
SELECT
	bo.${appSettings.tables.books_out.pk},
	bo.${appSettings.tables.book.pk},
    bo.${appSettings.tables.student.pk},
    bo.check_out_date,
    bo.check_in_date,
    s.first_name || ' ' || s.last_name as student_name,
    b.name book_name,
    bo.return_on
FROM
    ${appSettings.tables.books_out.name} bo
JOIN
    ${appSettings.tables.book.name} b
    ON bo.${appSettings.tables.book.pk} = b.${appSettings.tables.book.pk}
JOIN
    ${appSettings.tables.student.name} s
    ON bo.${appSettings.tables.student.pk} = s.${appSettings.tables.student.pk}`;

const repo = repoBase(`books_out`);
repo.getAll = async () => {
    const result =  await all(getAllQuery);
    return result;
};

const checkoutBookQuery = `
    INSERT INTO books_out(book_id, student_id, return_on, check_out_date)
    VALUES($book_id, $student_id, $return_on, $check_out_date);
`;

export const checkout = async (student_id, book_id) => {
    const statementObject = {
        $student_id: student_id,
        $book_id: book_id,
        $return_on: calculateReturnOnDateForDbInsert(),
        $check_out_date: formatDateForDbInsert()
    };
    await run(checkoutBookQuery, statementObject);
}

const checkinBookQuery = `
    UPDATE books_out 
    SET
        check_in_date = $check_in_date
    WHERE
        books_out_id = $books_out_id
`;

export const checkin = async (books_out_id, check_in_date = new Date()) => {
    const statementObject = {
        $books_out_id: books_out_id,
        $check_in_date: formatDateForDbInsert(check_in_date)
    };
    await run(checkinBookQuery, statementObject);
}

export default repo;
export const getBooksForSelect = getBooksSelectList;
export const getStudentsForSelect = getSelectList;

