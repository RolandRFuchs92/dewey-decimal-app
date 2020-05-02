import serviceBase from 'components/page/service.base';
import { TableAuthorSchema, AuthorSchema } from './Authors.type';

export default serviceBase<TableAuthorSchema, AuthorSchema>('author');
