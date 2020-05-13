import { dewey_summary_2 } from 'endpoints.json';
import { GET } from 'utils/ajax/AjaxWrapper';
import serviceBase from 'components/page/service.base';
import { DropdownListModel } from 'types/generic.type';

import { DeweySummary2Schema, TableDeweySummary2Schema } from './Summary2.type';

export default serviceBase<TableDeweySummary2Schema, DeweySummary2Schema>(
  'dewey_summary_2'
);

export async function getSelectList() {
  const result = await GET<{}, DropdownListModel[]>(
    dewey_summary_2.dropdownList.uri,
    {}
  );
  return result;
}
