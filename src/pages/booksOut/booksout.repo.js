import repoBase from 'components/page/repo.base';
import { getBooksSelectList } from 'pages/books/book.repo';
import { getStudentSelectList } from 'pages/student/Student.repo';

export default repoBase(`books_out`);
export const getBooksForSelect = getBooksSelectList;
export const getStudentsForSelect = getStudentSelectList;

