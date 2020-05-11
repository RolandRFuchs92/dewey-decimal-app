import { dewey_summary_3 } from 'endpoints.json';
import { GET } from 'utils/ajax/AjaxWrapper';
import serviceBase from 'components/page/service.base';
import { TableDeweySummary3Schema, DeweySummary3Schema } from './Summary3.type';
import { DropdownListModel } from 'types/generic.type';

export default serviceBase<TableDeweySummary3Schema, DeweySummary3Schema>(
  'dewey_summary_3'
);

export async function getSelectList() {
  const result = await GET<{}, DropdownListModel[]>(
    dewey_summary_3.dropdownList.uri,
    {}
  );
  return result;
}
