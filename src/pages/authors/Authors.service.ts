import { author } from 'endpoints.json';
import { GET } from 'utils/ajax/AjaxWrapper';
import serviceBase from 'components/page/service.base';
import { TableAuthorSchema, AuthorSchema } from './Authors.type';
import { DropdownListModel } from 'types/generic.type';

export default serviceBase<TableAuthorSchema, AuthorSchema>('author');

export async function getSelectList() {
  return GET<{}, DropdownListModel[]>(author.dropdownList.uri, {});
}
