import { formatDate } from 'appSettings.json';
import { ScansModel } from 'pages/booksOut/Booksout.type';
import format from 'date-fns/format/index.js';
import { ProcessedScansModel } from './Home.type';
import store from 'utils/redux/store';
import { setCheckinsToday, setCheckoutsToday } from './Home.action';

export default () => {};

export function updateScansData(scans: ScansModel[]) {
  const today = format(new Date(), formatDate.from);
  const checkoutResults = scans
    ? scans.filter(x => x.check_out_date.toString() === today)
    : [];
  const checkinResults = scans
    ? scans.filter(x => x.check_in_date && x.check_in_date.toString() === today)
    : [];

  const checkoutCount = checkoutResults.length;
  const checkinCount = checkinResults.length;

  const checkoutCountAction = setCheckoutsToday(checkoutCount);
  const checkinCountAction = setCheckinsToday(checkinCount);
  store.dispatch(checkoutCountAction);
  store.dispatch(checkinCountAction);

  const result: ProcessedScansModel = {
    checkoutResults,
    checkoutCount,
    checkinResults,
    checkinCount
  };
}
