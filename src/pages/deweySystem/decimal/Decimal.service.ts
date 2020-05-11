import { GET } from 'utils/ajax/AjaxWrapper';
import { dewey_decimal } from 'endpoints.json';
import serviceBase from 'components/page/service.base';
import { TableDeweyDecimalSchema, DeweyDecimalSchema } from './Decimal.type';
import { DropdownListModel } from 'types/generic.type';

export default serviceBase<TableDeweyDecimalSchema, DeweyDecimalSchema>(
  'dewey_decimal'
);

export async function getSelectList() {
  return GET<{}, DropdownListModel[]>(dewey_decimal.dropdownList.uri, {});
}
