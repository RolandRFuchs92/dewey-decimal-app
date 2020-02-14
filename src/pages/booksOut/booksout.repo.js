import repoBase from 'components/page/repo.base';
import { getBookSelectList } from 'pages/books/book.repo';

export default repoBase(`books_out`);
export const getBooksForSelect = getBookSelectList;

