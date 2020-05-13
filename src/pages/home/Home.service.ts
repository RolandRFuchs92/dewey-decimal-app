import { formatDate } from 'appSettings.json';
import format from 'date-fns/format/index.js';
import { ScansModel } from 'pages/booksOut/Booksout.type';
import { ProcessedScansModel } from './Home.type';
import store from 'utils/redux/store';
import { setCheckinsAndCheckoutsToday } from './Home.action';

export default () => {};

export function processScansData(scans: ScansModel[]) {
  const today = format(new Date(), formatDate.from);
  const checkoutResults = scans
    ? scans.filter(x => x.check_out_date.toString() === today)
    : [];
  const checkinResults = scans
    ? scans.filter(x => x.check_in_date && x.check_in_date.toString() === today)
    : [];

  const checkoutCount = checkoutResults.length;
  const checkinCount = checkinResults.length;

  const processResult: ProcessedScansModel = {
    checkoutResults,
    checkoutCount,
    checkinResults,
    checkinCount
  };

  const checkinAndOutCountAction = setCheckinsAndCheckoutsToday(processResult);
  store.dispatch(checkinAndOutCountAction);
}
