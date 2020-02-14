import repoBase from 'components/page/repo.base';
import { getSelectList as getAuthors } from "pages/authors.repo";


export default repoBase(`books_out`);


export const getAuthorsSelectList = getAuthors;
