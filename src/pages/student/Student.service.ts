import { get } from 'utils/ajax';
import { student } from 'endpoints.json';
import { BirthdaysType } from 'pages/home/Home.type';

export default () => {};

export async function getBirthdaysToday(): Promise<BirthdaysType[]> {
  try {
    const { result } = await get<{}, BirthdaysType[]>('url');
    return result;
  } catch (error) {
    return [];
  }
}
