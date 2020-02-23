import { differenceInBusinessDays } from 'date-fns';
import { format, parse } from 'date-fns';

import repoBase from 'components/page/repo.base';
import {all} from 'db/repo';
import appSettings from 'appSettings';

const { fines, formatDate } = appSettings;
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
	c.grade || ' ' || c.class_name class,
	t.first_name || ' ' || t.last_name teacher_name,
	bo.check_out_date,
	bo.return_on,
	bo.check_in_date
FROM	
	book b
JOIN
	author a
	ON b.author_id = a.author_id
LEFT JOIN
	books_out bo
	ON b.book_id = bo.book_id
LEFT JOIN
	student s
	ON bo.student_id = s.student_id
LEFT JOIN
	class c
	ON s.class_id = c.class_id
LEFT JOIN
	teacher t
	ON c.class_id = t.class_id
WHERE	
    b.call_number = $call_number
`

export const getBookByCallNumber = async (call_number) => {
    const [data] = await all(getBookByCallNumberQuery, { $call_number: call_number });

    if(data.student_name) 
        return calculateCheckin(data);
    return calculateCheckout(data);
}

const calculateCheckin = (data) => {
    return data;
}

const calculateCheckout = (data) => { 
    if(data && !data.check_in_date && fines.isEnabled) {
        let {check_out_date, return_on} = data;
        check_out_date = parse(data.check_out_date, formatDate.from, new Date());
        return_on = parse(data.return_on, formatDate.from, new Date());
        const diffDays = differenceInBusinessDays(check_out_date, return_on);
        data.check_out_date = format(check_out_date, formatDate.to, new Date());
        data.check_in_on = data.check_in_on && format(parse(data.check_in_on, formatDate.to, new Date()))
        data.return_on = format(return_on, formatDate.to, new Date());
        data.fine = diffDays > 0 ? `R${diffDays * fines.rate}` : 'None';
    } else {
        data.fine = 'None';
    }
    return data;
}
