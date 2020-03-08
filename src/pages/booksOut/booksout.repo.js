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

const scannsQuery = `
SELECT
    t.first_name || ' ' || t.last_name teacher,
    c.grade || c.class_name class,
    b.name book,
    a.name || ' ' || a.second_name || ' ' || a.surname author,
    s.first_name || ' ' || s.last_name student,
    bo.check_in_date,
    bo.check_out_date
FROM	
    books_out bo
JOIN
    book b
    ON bo.book_id = b.book_id
JOIN
    author a
    ON b.author_id = a.author_id
JOIN	
    student s
    ON bo.student_id = s.student_id
JOIN
    class c
    ON s.class_id = c.class_id
JOIN
    teacher t
    ON c.class_id = t.class_id
WHERE
    STRFTIME('%Y-%m-%d', bo.check_in_date) = STRFTIME('%Y-%m-%d', $date)
    OR STRFTIME('%Y-%m-%d', bo.check_out_date) = STRFTIME('%Y-%m-%d', $date)
`;
export const getScans = async (date = new Date()) => {
    const statementObject = {
        $date: formatDateForDbInsert(date)
    };
    return await all(scannsQuery, statementObject);
}

const booksOverdueQuery = `
SELECT
	s.first_name || ' ' || s.last_name student_name,
	b.name book_name,
	a.name || ' ' || a.second_name || ' ' || a.surname author_name,
	bo.return_on
FROM	
	books_out bo
JOIN	
	book b
	ON bo.book_id = b.book_id
JOIN
	student s
	ON s.student_id = bo.student_id
JOIN
 	class c
	ON s.class_id = c.class_id
JOIN
	author a
	on b.author_id = a.author_id
WHERE
	STRFTIME('%Y-%m-%d',bo.return_on) <= STRFTIME('%Y-%m-%d', $date)
	AND bo.check_in_date IS NULL 
`;

export const getBooksOverdue = async (date = new Date()) => {
    const statementObject = {
        $date: formatDateForDbInsert(date)
    };
    return await all(booksOverdueQuery, statementObject);
}

export const countBooksOverdue = async (date = new Date()) => {
    const statementObject = {
        $date: formatDateForDbInsert(date)
    };
    
    const statement = `SELECT COUNT(*) FROM ${booksOverdueQuery.split('FROM').pop()}`
    debugger;
    return await all(statement, statementObject);
}

const countBooksCheckedOutTodayQuery = `SELECT COUNT(*) FROM books_out WHERE check_out_date =  STRFTIME('%Y-%m-%d', 'now')`;

export const countBooksCheckedOutToday = async () => {
    const statement = countBooksCheckedOutTodayQuery;
    return await all(statement);
}

const countBooksCheckedInTodayQuery = `SELECT COUNT(*) FROM books_out WHERE check_in_date =  STRFTIME('%Y-%m-%d', 'now')`;
export const countBooksCheckedInToday = async () => {
    const statement = countBooksCheckedInTodayQuery;
    return await all(statement);
}


export default repo;
export const getBooksForSelect = getBooksSelectList;
export const getStudentsForSelect = getSelectList;

