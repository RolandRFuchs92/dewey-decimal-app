import { formatDate } from 'appSettings.json';
import { ScansModel } from 'pages/booksOut/Booksout.type';
import format from 'date-fns/format/index.js';
import { ProcessedScansModel } from './Home.type';

export default () => {};

export function processScanData(scans: ScansModel[]) {
  const today = format(new Date(), formatDate.from);
  const checkoutResults = scans
    ? scans.filter(x => x.check_out_date.toString() === today)
    : [];
  const checkinResults = scans
    ? scans.filter(x => x.check_in_date && x.check_in_date.toString() === today)
    : [];

  const checkoutCount = checkoutResults.length;
  const checkinCount = checkinResults.length;
  const result: ProcessedScansModel = {
    checkoutResults,
    checkoutCount,
    checkinResults,
    checkinCount
  };
  return result;
}
