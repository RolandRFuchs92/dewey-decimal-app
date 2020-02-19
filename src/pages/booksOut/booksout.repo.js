import repoBase from 'components/page/repo.base';
import { getBooksSelectList } from 'pages/books/book.repo';
import { getSelectList } from 'pages/student/Student.repo';
import { all } from 'db/repo';
import appSettings from 'appSettings';

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

export default repo;
export const getBooksForSelect = getBooksSelectList;
export const getStudentsForSelect = getSelectList;

