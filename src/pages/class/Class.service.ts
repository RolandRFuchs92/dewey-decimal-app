import { get } from 'utils/ajax';
import { class as classEndpoint } from 'endpoints.json';
import { DropdownListModel, Result } from 'types/generic.type';

export async function getDropdownList(): Promise<Result<DropdownListModel[]>> {
  const result = await get<{}, DropdownListModel[]>(
    classEndpoint.dropdownList.uri,
    {}
  );
  return result;
}

export default () => {};
