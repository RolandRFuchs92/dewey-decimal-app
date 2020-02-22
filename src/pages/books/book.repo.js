import appSettings from 'appSettings';

import repoBase from 'components/page/repo.base';
import {all} from 'db/repo';

const {tables: {book, author, dewey_decimal}} = appSettings;

const getAllQuery = `
SELECT	
    b.${book.pk},
    a.${author.pk},
    dd.decimal_id,
    dd.name as dewey_decimal_name,
    a.name || ' ' || a.surname as author_name,
    b.call_number,
    b.name,
    b.publisher
FROM
    ${book.name} b
JOIN
    ${author.name} a
    ON b.${author.pk} = a.${author.pk}
JOIN
    ${dewey_decimal.name} dd
    ON b.decimal_id = dd.decimal_id
`
const repo = repoBase(`book`);

repo.getAll = async () => {
    return await all(getAllQuery);
}

export default repo;

const getBooksSelectListQuery = `
    SELECT
        ${book.pk},
        name,
        call_number
    FROM
        ${book.name}
`;

export const getBooksSelectList = async () => {
    const data = await all(getBooksSelectListQuery);
    return data.map(({[appSettings.tables.book.pk] :pk, name, call_number}) => {
        return {
            value: pk,
            text: `${name.substr(0,20)} - ${call_number}`
        };
    });
}


const getStudentBooksHistoryQuery = `
SELECT	
    bo.student_id,
    a.name || ' ' || a.second_name || ' '|| a.surname author_name,
    b.name as book_name,
    bo.check_out_date,
    bo.check_in_date,
    bo.return_on
FROM	
    books_out bo
JOIN
    book b
    on bo.book_id = b.book_id	
JOIN
    author a
    on b.author_id = a.author_id
WHERE
    student_id = $student_id
ORDER by 
	bo.check_out_date DESC
`;
export const getStudentBooksHistory = async (student_id) => {
    const data = await all(getStudentBooksHistoryQuery, {$student_id: student_id});
    return data;
}

const getBookByCallNumberQuery = `
SELECT
    b.name book_name,
    a.name || ' ' || a.second_name || ' ' || a.surname author_name,
    b.call_number,
    s.first_name || ' ' || s.last_name student_name,
    c.grade || ' ' || c.class_name class_name,
    t.first_name || ' ' || t.last_name teacher_name,
    bo.check_out_date,
    bo.return_on,
    bo.check_in_date
FROM	
    book b
JOIN
    books_out bo
    ON b.book_id = bo.book_id
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
    b.call_number = $call_number
`

export const getBookByCallNumber = async (call_number) => {
    const data = await all(getBookByCallNumberQuery, { $call_number: call_number });
    return data;
}