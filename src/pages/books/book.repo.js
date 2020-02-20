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
    student_id = 1
`;
export const getStudentBooksHistory = async () => {
    const data = await all(getStudentBooksHistoryQuery);
    return data;
}