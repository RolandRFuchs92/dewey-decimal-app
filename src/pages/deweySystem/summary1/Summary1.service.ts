import serviceBase from 'components/page/service.base';
import { dewey_summary } from 'endpoints.json';
import { DeweySummarySchema } from './Summary1.type';
import { DropdownListModel } from 'types/generic.type';
import { GET } from 'utils/ajax/AjaxWrapper';

export default serviceBase<DeweySummarySchema, DeweySummarySchema>(
  'dewey_summary'
);

export async function getSelectList() {
  const result = await GET<{}, DropdownListModel[]>(
    dewey_summary.dropdownList.uri,
    {}
  );
  return result;
}
