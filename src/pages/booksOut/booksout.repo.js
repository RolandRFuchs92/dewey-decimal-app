import appSettings from 'appSettings';
import repoBase from 'components/page/repo.base';
import { getBooksSelectList } from 'pages/books/book.repo';
import { getStudentSelectList } from 'pages/student/Student.repo';
import { all } from 'db/repo';

const getAllQuery = `
SELECT
	bo.books_out_id,
	bo.book_id,
    bo.student_id,
    bo.check_out_date,
    bo.check_in_date,
    s.first_name || ' ' || s.last_name as student_name,
	b.name book_name
FROM
    books_out bo
JOIN
    book b
    ON bo.book_id = b.book_id
JOIN
    student s
    ON bo.student_id = s.student_id
`;


const repo = repoBase(`books_out`);
repo.getAll = async () => {
    return await all();
};

export default repo;
export const getBooksForSelect = getBooksSelectList;
export const getStudentsForSelect = getStudentSelectList;

